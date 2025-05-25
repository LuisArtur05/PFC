package miapi.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.DAO.RecetaDAO;
import miapi.DAO.UsuarioDAO;
import miapi.DTO.RecetaDTO;
import miapi.Tables.Receta;
import miapi.Tables.Usuario;

@Service
@RequiredArgsConstructor
public class RecetaService {
    private final RecetaDAO recetaDAO;
    private final UsuarioDAO usuarioDAO;

    public Receta createReceta(RecetaDTO dto) {

        Usuario usuario = usuarioDAO.findByIdOrThrow(dto.getUsuario_id());

        Receta receta = new Receta();
        receta.setUsuario(usuario);
        receta.setNombre(dto.getNombre());
        receta.setInstrucciones(dto.getInstrucciones());
        receta.setTiempo_preparacion(dto.getTiempo_preparacion());
        receta.setDificultad(dto.getDificultad());
        receta.setPrecio(dto.getPrecio()); 

        return recetaDAO.save(receta);
    }

    public RecetaDTO buscarRecetaPorId(Integer id) {
        Receta receta = recetaDAO.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Receta no encontrada con ID: " + id));

        RecetaDTO dto = new RecetaDTO();
        dto.setId_receta(receta.getId_receta());
        dto.setUsuario_id(receta.getUsuario().getId_usuario()); // fix: usuario_id no era el id de receta
        dto.setNombre(receta.getNombre());
        dto.setInstrucciones(receta.getInstrucciones());
        dto.setTiempo_preparacion(receta.getTiempo_preparacion());
        dto.setDificultad(receta.getDificultad());
        dto.setPrecio(receta.getPrecio()); 

        return dto;
    }

    public List<RecetaDTO> obtenerRecetasPorUsuarioId(Integer usuarioId) {
        Usuario usuario = usuarioDAO.findByIdOrThrow(usuarioId);
        List<Receta> recetas = recetaDAO.findByUsuario(usuario);

        return recetas.stream().map(receta -> {
            RecetaDTO dto = new RecetaDTO();
            dto.setId_receta(receta.getId_receta());
            dto.setUsuario_id(usuarioId);
            dto.setNombre(receta.getNombre());
            dto.setInstrucciones(receta.getInstrucciones());
            dto.setTiempo_preparacion(receta.getTiempo_preparacion());
            dto.setDificultad(receta.getDificultad());
            dto.setPrecio(receta.getPrecio()); 
            return dto;
        }).toList();
    }

    public void eliminarRecetaPorId(Integer id) {
        Receta receta = recetaDAO.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Receta no encontrada con ID: " + id));
        
        recetaDAO.delete(receta);
    }

    public RecetaDTO actualizarReceta(Integer usuarioId, Integer recetaId, RecetaDTO dto) {
        Usuario usuario = usuarioDAO.findByIdOrThrow(usuarioId);
        Receta receta = recetaDAO.findById(recetaId)
                .orElseThrow(() -> new EntityNotFoundException("Receta no encontrada con ID: " + recetaId));
    
        // Validación: asegurarse de que la receta pertenece al usuario
        if (!receta.getUsuario().getId_usuario().equals(usuario.getId_usuario())) {
            throw new IllegalArgumentException("La receta no pertenece al usuario especificado.");
        }
    
        // Actualizar campos permitidos
        receta.setNombre(dto.getNombre());
        receta.setInstrucciones(dto.getInstrucciones());
        receta.setTiempo_preparacion(dto.getTiempo_preparacion());
        receta.setDificultad(dto.getDificultad());
        receta.setPrecio(dto.getPrecio());
    
        recetaDAO.save(receta);
    
        // Convertir a DTO de respuesta
        RecetaDTO updatedDTO = new RecetaDTO();
        updatedDTO.setId_receta(receta.getId_receta());
        updatedDTO.setUsuario_id(usuarioId);
        updatedDTO.setNombre(receta.getNombre());
        updatedDTO.setInstrucciones(receta.getInstrucciones());
        updatedDTO.setTiempo_preparacion(receta.getTiempo_preparacion());
        updatedDTO.setDificultad(receta.getDificultad());
        updatedDTO.setPrecio(receta.getPrecio());
    
        return updatedDTO;
    }
    
}
