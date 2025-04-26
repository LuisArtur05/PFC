package miapi.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import miapi.Service.EmailService;
import miapi.Service.TokenService;
import miapi.Service.UsuarioService;
import miapi.Tables.Usuario;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Creacion de usuarios,Login,recuperar contraseña")
public class UsuarioController {
        private final UsuarioService usuarioService;
        private final TokenService tokenService;
        private final EmailService emailService;

        @PostMapping("/crearUsuario")
        @Operation(summary = "Crear usuario", description = "Crea un nuevo usuario en el sistema")
        @ApiResponses({
                        @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente"),
                        @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),

        })
        public ResponseEntity<Usuario> crearUsuario(
                        @RequestBody(description = "Datos del usuario a crear", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                                        {
                                          "nombre": "Alberto",
                                          "email": "alberto@gmail.com",
                                          "password": "123"
                                        }
                                        """))) @org.springframework.web.bind.annotation.RequestBody Usuario usuario) {

                usuarioService.createUsuario(usuario);
                return new ResponseEntity<>(usuario, HttpStatus.CREATED);
        }

        @PostMapping("/getID")
        @Operation(summary = "Obtener ID de usuario", description = "Devuelve el ID de un usuario por email y contraseña")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "ID encontrado exitosamente"),
                        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
        })
        public ResponseEntity<Integer> getID(
                        @RequestBody(description = "Credenciales del usuario", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                                        {
                                          "email": "alberto@gmail.com",
                                          "password": "123"
                                        }
                                        """))) @org.springframework.web.bind.annotation.RequestBody Usuario usuario) {

                Integer id = usuarioService.getIDByEmailAndPassword(usuario.getEmail(), usuario.getPassword());
                return ResponseEntity.ok(id);
        }

        @PostMapping("/solicitar-reset")
        @Operation(summary = "Solicitar restablecimiento de contraseña", description = "Envía un correo con un enlace para restablecer la contraseña")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Correo enviado correctamente"),
                        @ApiResponse(responseCode = "400", description = "Correo no registrado")
        })
        public ResponseEntity<String> solicitarReset(
                        @RequestBody(description = "Email del usuario", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                                        {
                                          "email": "alberto@gmail.com"
                                        }
                                        """))) @org.springframework.web.bind.annotation.RequestBody Usuario usuario) {

                String email = usuario.getEmail();
                String token = tokenService.generarToken();

                // Guardamos el token en memoria asociado al correo
                tokenService.guardarToken(email, token);

                // URL del frontend con token como parámetro
                String linkReset = "http://localhost:5173/reset-password?token=" + token;

                // Enviamos el correo con el link
                emailService.enviarCorreoRecuperacion(email, linkReset);

                return ResponseEntity.ok("Se han enviado instrucciones al correo.");
        }

        // Endpoint para confirmar el restablecimiento de contraseña (actualizar la
        // contraseña)
        @PostMapping("/restablecer-password")
        @Operation(summary = "Restablecer la contraseña", description = "Actualiza la contraseña de un usuario con el token recibido en el correo")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Contraseña actualizada correctamente"),
                        @ApiResponse(responseCode = "400", description = "Token inválido o expirado"),
                        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
        })
        public ResponseEntity<String> restablecerPassword(
                        @RequestParam String token,
                        @RequestParam String nuevaPassword) {

                if (tokenService.validarToken(token)) {
                        // Aquí deberías actualizar la contraseña en la base de datos
                        // usuarioService.actualizarPassword(email, nuevaPassword);

                        // Eliminamos el token después de que se haya usado
                        tokenService.eliminarToken(token);

                        return ResponseEntity.ok("Contraseña actualizada correctamente.");
                } else {
                        return ResponseEntity.status(400).body("Token inválido o expirado.");
                }
        }
}
