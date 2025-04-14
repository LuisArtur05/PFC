package miapi.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import miapi.Usuario;

@Repository
public interface UsuarioDAO extends JpaRepository<Usuario, Integer> {

    default Usuario findByIdOrThrow(Integer id) {
        return findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    Optional<Usuario> findByEmailAndPassword(String email, String password);

}