package miapi.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import miapi.Service.UsuarioService;
import miapi.Tables.Usuario;


@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@Tag(name = "usuarios", description = "Usuarios GETTERS and POST")
public class UsuarioController {
    private final UsuarioService usuarioService;

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

}
