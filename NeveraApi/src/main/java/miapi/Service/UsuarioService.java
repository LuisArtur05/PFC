package miapi.Service;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.Usuario;
import miapi.DAO.UsuarioDAO;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioDAO usuarioDAO;

    public void createUsuario(Usuario usuario) {
        System.out.println("Se ha creado un usuario");
        usuarioDAO.save(usuario);
    }

    public Integer getIDByEmailAndPassword(String email, String password) {
        return usuarioDAO.findByEmailAndPassword(email, password)
                .map(Usuario::getId_usuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese email y contraseña"));
    }
}
