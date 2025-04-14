package miapi.Service;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.Alimento;
import miapi.Categoria;
import miapi.Usuario;
import miapi.DAO.AlimentoDAO;
import miapi.DAO.CategoriaDAO;
import miapi.DAO.UsuarioDAO;
import miapi.DTO.AlimentoDTO;

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

    public AlimentoDTO buscarAlimentoPorId(Integer id) {
        Alimento alimento = alimentoDAO.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Alimento no encontrado con ID: " + id));
    
        AlimentoDTO dto = new AlimentoDTO();
        dto.setId_alimento(alimento.getId_alimento());
        dto.setUsuario_id(alimento.getUsuario().getId_usuario());
        dto.setCategoria_id(alimento.getCategoria().getId_categoria_alimento());
        dto.setNombre(alimento.getNombre());
        dto.setFecha_caducidad(alimento.getFecha_caducidad());
        dto.setCantidad(alimento.getCantidad());
        dto.setUbicacion(alimento.getUbicacion());
    
        return dto;
    }
    
}
