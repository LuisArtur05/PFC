package miapi.Config;

public class ResetToken {

    private String token;
    private String email;

    // Constructor manual
    public ResetToken(String token, String email) {
        this.token = token;
        this.email = email;
    }

    // Getters y setters manuales
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Método para verificar si el token ha expirado
    public boolean estaExpirado(long tiempoCreacion) {
        long tiempoActual = System.currentTimeMillis();
        long tiempoLimite = 60 * 60 * 1000; // 1 hora en milisegundos
        return (tiempoActual - tiempoCreacion) > tiempoLimite;
    }
}
