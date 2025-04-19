package miapi.Service;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.DAO.CategoriaDAO;
import miapi.Tables.Categoria;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    private final CategoriaDAO categoriaDAO;

    public void createCategoria(Categoria categoria) {
        System.out.println("Se ha creado una receta");
        categoriaDAO.save(categoria);
    }

    public void eliminarCategoria(Integer id) {
        if (!categoriaDAO.existsById(id)) {
            throw new EntityNotFoundException("Categoría no encontrada con ID: " + id);
        }
        categoriaDAO.deleteById(id);
    }

}
