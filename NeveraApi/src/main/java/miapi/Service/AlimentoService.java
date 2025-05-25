package miapi.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.DAO.AlimentoDAO;
import miapi.DAO.CategoriaDAO;
import miapi.DAO.UsuarioDAO;
import miapi.DTO.AlimentoDTO;
import miapi.Tables.Alimento;
import miapi.Tables.Categoria;
import miapi.Tables.Usuario;

@Service
@RequiredArgsConstructor
public class AlimentoService {

    private final AlimentoDAO alimentoDAO;
    private final CategoriaDAO categoriaDAO;
    private final UsuarioDAO usuarioDAO;

    public Alimento createAlimento(AlimentoDTO dto) {

        // Obtener entidades a través de los DAOs
        Categoria categoria = categoriaDAO.findByIdOrThrow(dto.getCategoria_id());
        Usuario usuario = usuarioDAO.findByIdOrThrow(dto.getUsuario_id());

        // Crear y guardar el alimento
        Alimento alimento = new Alimento();
        alimento.setCategoria(categoria);
        alimento.setUsuario(usuario);
        alimento.setNombre(dto.getNombre());
        alimento.setFecha_caducidad(dto.getFecha_caducidad());
        alimento.setCantidad(dto.getCantidad());
        alimento.setUbicacion(dto.getUbicacion());
        alimento.setPrecio(dto.getPrecio());
        alimento.setProveedor(dto.getProveedor());
        alimento.setLista_active(0);
        alimento.setNevera_active(1);

        return alimentoDAO.save(alimento);
    }

    public Alimento createAlimentoLista(AlimentoDTO dto) {

        // Obtener entidades a través de los DAOs
        Categoria categoria = categoriaDAO.findByIdOrThrow(dto.getCategoria_id());
        Usuario usuario = usuarioDAO.findByIdOrThrow(dto.getUsuario_id());

        // Crear y guardar el alimento
        Alimento alimento = new Alimento();
        alimento.setCategoria(categoria);
        alimento.setUsuario(usuario);
        alimento.setNombre(dto.getNombre());
        alimento.setFecha_caducidad(dto.getFecha_caducidad());
        alimento.setCantidad(dto.getCantidad());
        alimento.setUbicacion(dto.getUbicacion());
        alimento.setPrecio(dto.getPrecio());
        alimento.setProveedor(dto.getProveedor());
        alimento.setLista_active(1);
        alimento.setNevera_active(0);

        return alimentoDAO.save(alimento);
    }

    public void eliminarAlimento(Integer id) {
        Alimento alimento = alimentoDAO.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Alimento no encontrado con ID: " + id));

        alimentoDAO.delete(alimento);
    }

    public Alimento actualizarAlimento(Integer id_alimento, Integer usuario_id, AlimentoDTO dto) {
        Alimento alimento = alimentoDAO.findById(id_alimento)
                .orElseThrow(() -> new EntityNotFoundException("Alimento no encontrado con ID: " + id_alimento));

        if (!alimento.getUsuario().getId_usuario().equals(usuario_id)) {
            throw new EntityNotFoundException("El alimento no pertenece al usuario con ID: " + usuario_id);
        }

        // Ignorar los campos dto.getId_alimento() y dto.getUsuario_id()
        if (dto.getNombre() != null)
            alimento.setNombre(dto.getNombre());
        if (dto.getFecha_caducidad() != null)
            alimento.setFecha_caducidad(dto.getFecha_caducidad());
        if (dto.getCantidad() != null)
            alimento.setCantidad(dto.getCantidad());
        if (dto.getUbicacion() != null)
            alimento.setUbicacion(dto.getUbicacion());

        if (dto.getCategoria_id() != null) {
            Categoria categoria = categoriaDAO.findByIdOrThrow(dto.getCategoria_id());
            alimento.setCategoria(categoria);
        }

        if (dto.getPrecio() != null)
            alimento.setPrecio(dto.getPrecio());

        if (dto.getProveedor() != null)
            alimento.setProveedor(dto.getProveedor());

        // NO modificar el usuario ni el id_alimento
        return alimentoDAO.save(alimento);
    }

    public AlimentoDTO buscarAlimentoPorId(Integer id) {
        Alimento alimento = alimentoDAO.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Alimento no encontrado con ID: " + id));

        AlimentoDTO dto = new AlimentoDTO();
        dto.setId_alimento(alimento.getId_alimento());
        dto.setUsuario_id(alimento.getUsuario().getId_usuario());
        dto.setCategoria_id(alimento.getCategoria().getId_categoria());
        dto.setNombre(alimento.getNombre());
        dto.setFecha_caducidad(alimento.getFecha_caducidad());
        dto.setCantidad(alimento.getCantidad());
        dto.setUbicacion(alimento.getUbicacion());
        dto.setPrecio(alimento.getPrecio());
        dto.setProveedor(alimento.getProveedor());

        return dto;
    }

    public List<AlimentoDTO> obtenerAlimentosPorUsuario(Integer usuarioId) {
        // Buscar todos los alimentos del usuario
        List<Alimento> alimentos = alimentoDAO.buscarPorUsuario(usuarioId);

        // Filtrar por nevera_active == 1 y convertir a DTOs
        return alimentos.stream()
                .filter(alimento -> alimento.getNevera_active() == 1)
                .map(alimento -> {
                    AlimentoDTO dto = new AlimentoDTO();
                    dto.setId_alimento(alimento.getId_alimento());
                    dto.setUsuario_id(alimento.getUsuario().getId_usuario());
                    dto.setCategoria_id(alimento.getCategoria().getId_categoria());
                    dto.setNombre(alimento.getNombre());
                    dto.setFecha_caducidad(alimento.getFecha_caducidad());
                    dto.setCantidad(alimento.getCantidad());
                    dto.setUbicacion(alimento.getUbicacion());
                    dto.setPrecio(alimento.getPrecio());
                    dto.setProveedor(alimento.getProveedor());
                    dto.setLista_active(alimento.getLista_active());
                    dto.setNevera_active(alimento.getNevera_active());
                    return dto;
                })

                .collect(Collectors.toList());
    }

    public List<AlimentoDTO> obtenerAlimentosPorUsuarioYLista(Integer usuarioId) {
        // Buscar todos los alimentos del usuario
        List<Alimento> alimentos = alimentoDAO.buscarPorUsuario(usuarioId);

        // Filtrar por nevera_active == 1 y convertir a DTOs
        return alimentos.stream()
                .filter(alimento -> alimento.getLista_active() == 1)
                .map(alimento -> {
                    AlimentoDTO dto = new AlimentoDTO();
                    dto.setId_alimento(alimento.getId_alimento());
                    dto.setUsuario_id(alimento.getUsuario().getId_usuario());
                    dto.setCategoria_id(alimento.getCategoria().getId_categoria());
                    dto.setNombre(alimento.getNombre());
                    dto.setFecha_caducidad(alimento.getFecha_caducidad());
                    dto.setCantidad(alimento.getCantidad());
                    dto.setUbicacion(alimento.getUbicacion());
                    dto.setPrecio(alimento.getPrecio());
                    dto.setProveedor(alimento.getProveedor());
                    dto.setLista_active(alimento.getLista_active());
                    dto.setNevera_active(alimento.getNevera_active());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<String> obtenerNombresAlimentosSinCaducarPorUsuario(Integer usuarioId) {
        List<Alimento> alimentos = alimentoDAO.buscarPorUsuarioConCaducidadValida(usuarioId);

        return alimentos.stream()
                .filter(a -> a.getNevera_active() != null && a.getNevera_active() == 1)
                .map(Alimento::getNombre)
                .collect(Collectors.toList());
    }

    public Map<String, Float> obtenerPrecioPorUbicacion(Integer usuarioId) {
        List<Alimento> alimentos = alimentoDAO.buscarPorUsuario(usuarioId);

        return alimentos.stream()
                .filter(a -> a.getNevera_active() == 1) // Solo si nevera_active == 1
                .collect(Collectors.groupingBy(
                        a -> a.getUbicacion().name(), // Agrupar por nombre de ubicación
                        Collectors.summingDouble(Alimento::getPrecio) // Sumar precios
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().floatValue())); // Convertir a Float
    }

    public void cambiarNeveraALista(Integer usuarioId, Integer alimentoId) {
        Alimento alimento = alimentoDAO.findById(alimentoId)
                .orElseThrow(() -> new EntityNotFoundException("Alimento no encontrado con ID: " + alimentoId));

        if (!alimento.getUsuario().getId_usuario().equals(usuarioId)) {
            throw new EntityNotFoundException("El alimento no pertenece al usuario con ID: " + usuarioId);
        }

        alimento.setNevera_active(0);
        alimento.setLista_active(1);

        alimentoDAO.save(alimento);
    }

    public void cambiarListaANevera(Integer usuarioId, Integer alimentoId) {
        Alimento alimento = alimentoDAO.findById(alimentoId)
                .orElseThrow(() -> new EntityNotFoundException("Alimento no encontrado con ID: " + alimentoId));

        if (!alimento.getUsuario().getId_usuario().equals(usuarioId)) {
            throw new EntityNotFoundException("El alimento no pertenece al usuario con ID: " + usuarioId);
        }

        alimento.setLista_active(0);
        alimento.setNevera_active(1);

        alimentoDAO.save(alimento);
    }

}
