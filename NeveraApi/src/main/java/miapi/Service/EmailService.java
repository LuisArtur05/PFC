package miapi.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // Inyectamos el JavaMailSender para enviar los correos
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Método para enviar un correo con el token de restablecimiento de contraseña
    public void enviarCorreoRecuperacion(String email, String token) {
        // Creamos el mensaje de correo
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Restablecimiento de contraseña");
        message.setText("Para restablecer tu contraseña, utiliza el siguiente token: " + token);

        // Enviamos el correo
        mailSender.send(message);
    }
}
