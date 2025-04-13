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

import miapi.Alimento;
import miapi.DTO.AlimentoDTO;
import miapi.Service.AlimentoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/alimento")
@RequiredArgsConstructor
@Tag(name = "Alimentos", description = "Gestion de alimentos")
public class AlimentoController {
    private final AlimentoService alimentoService;

    @PostMapping("/crearAlimento")
    @Operation(summary = "Crear alimento", description = "Crea un nuevo alimento en el sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Alimento creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),

    })

    public ResponseEntity<Alimento> crearAlimento(

            @RequestBody(description = "Datos del alimento a crear", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                    {
                      "usuario_id": 1,
                      "categoria_id":5,
                      "nombre": "leche",
                      "fecha_caducidad": "2025-04-11",
                      "cantidad":2,
                      "ubicacion":"Frigorifico"


                    }
                    """))) @org.springframework.web.bind.annotation.RequestBody AlimentoDTO alimentoDTO) {

        Alimento alimento = alimentoService.createAlimento(alimentoDTO);
        return new ResponseEntity<>(alimento, HttpStatus.CREATED);
    }

    @GetMapping("/BuscarAlimento/{id}")
    @Operation(summary = "Buscar alimento por ID", description = "Devuelve los datos simples del alimento")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Alimento encontrado"),
            @ApiResponse(responseCode = "404", description = "Alimento no encontrado"),
    })
    public ResponseEntity<AlimentoDTO> buscarAlimentoPorId(@PathVariable Integer id) {
        AlimentoDTO dto = alimentoService.buscarAlimentoPorId(id);
        return ResponseEntity.ok(dto);
    }

}
