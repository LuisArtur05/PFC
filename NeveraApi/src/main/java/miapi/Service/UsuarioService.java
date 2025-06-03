package miapi.Service;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.DAO.UsuarioDAO;
import miapi.Tables.Usuario;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioDAO usuarioDAO;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void createUsuario(Usuario usuario) {
        System.out.println("Se ha creado un usuario");
        usuarioDAO.save(usuario);
    }

    public Integer getIDByEmailAndPassword(String email, String password) {
        Usuario usuario = usuarioDAO.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese email"));

        String hashedPassword = usuario.getPassword();

        // Compara password plano con hash
        boolean passwordMatches = BCrypt.checkpw(password, hashedPassword);

        if (passwordMatches) {
            return usuario.getId_usuario();
        } else {
            throw new EntityNotFoundException("Contraseña incorrecta");
        }
    }

}
