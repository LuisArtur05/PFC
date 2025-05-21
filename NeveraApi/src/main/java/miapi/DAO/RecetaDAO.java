package miapi.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import miapi.Tables.Receta;
import miapi.Tables.Usuario;

@Repository
public interface RecetaDAO extends JpaRepository<Receta,Integer>{
    List<Receta> findByUsuario(Usuario usuario);
    @Query("SELECT r FROM Receta r WHERE r.usuario.id_usuario = :usuarioId")
    List<Receta> buscarPorUsuario(@Param("usuarioId") Integer usuarioId);

    

}
