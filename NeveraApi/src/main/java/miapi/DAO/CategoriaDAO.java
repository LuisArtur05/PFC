package miapi.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import miapi.Tables.Categoria;

@Repository
public interface CategoriaDAO  extends JpaRepository<Categoria, Integer> {

    default Categoria findByIdOrThrow(Integer id) {
        return findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
    }
}
