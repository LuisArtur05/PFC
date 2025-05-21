package miapi.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import miapi.Tables.Alimento;

@Repository
public interface AlimentoDAO extends JpaRepository<Alimento, Integer> {

    @Query("SELECT a FROM Alimento a WHERE a.usuario.id_usuario = :usuarioId")
    List<Alimento> buscarPorUsuario(@Param("usuarioId") Integer usuarioId);

    @Query("SELECT a FROM Alimento a WHERE a.usuario.id_usuario = :usuarioId AND a.fecha_caducidad > CURRENT_DATE")
    List<Alimento> buscarPorUsuarioConCaducidadValida(@Param("usuarioId") Integer usuarioId);
}
