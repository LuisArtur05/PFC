package miapi.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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

        return dto;
    }

    public List<AlimentoDTO> obtenerAlimentosPorUsuario(Integer usuarioId) {
        // Buscar todos los alimentos del usuario, usando el DAO
        List<Alimento> alimentos = alimentoDAO.buscarPorUsuario(usuarioId);

        // Convertir los alimentos en DTOs
        return alimentos.stream().map(alimento -> {
            AlimentoDTO dto = new AlimentoDTO();
            dto.setId_alimento(alimento.getId_alimento());
            dto.setUsuario_id(alimento.getUsuario().getId_usuario());
            dto.setCategoria_id(alimento.getCategoria().getId_categoria());
            dto.setNombre(alimento.getNombre());
            dto.setFecha_caducidad(alimento.getFecha_caducidad());
            dto.setCantidad(alimento.getCantidad());
            dto.setUbicacion(alimento.getUbicacion());
            return dto;
        }).collect(Collectors.toList());
    }

}
