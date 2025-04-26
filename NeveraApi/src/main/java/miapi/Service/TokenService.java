package miapi.Service;


import org.springframework.stereotype.Service;

import miapi.Config.ResetToken;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class TokenService {

    // Usamos un Map para almacenar los tokens
    private final Map<String, ResetToken> tokenMap = new HashMap<>();
    private final Map<String, Long> tokenCreationTime = new HashMap<>();  // Mapa para almacenar el tiempo de creación de cada token

    // Método para generar un token único
    public String generarToken() {
        return UUID.randomUUID().toString();  // Usamos UUID para crear un token único
    }

    // Guardar el token en memoria
    public void guardarToken(String email, String token) {
        tokenMap.put(token, new ResetToken(token, email));
        tokenCreationTime.put(token, System.currentTimeMillis());       // Guardamos el tiempo de creación del token
    }

    // Verificar si el token es válido
    public boolean validarToken(String token) {
        ResetToken resetToken = tokenMap.get(token);
        if (resetToken == null) {
            return false;  // Token no existe
        }

        long tiempoCreacion = tokenCreationTime.get(token);
        return !resetToken.estaExpirado(tiempoCreacion);  // Verificamos si ha expirado
    }

    // Método para eliminar el token (si ya fue usado o ha expirado)
    public void eliminarToken(String token) {
        tokenMap.remove(token);
        tokenCreationTime.remove(token);
    }
}