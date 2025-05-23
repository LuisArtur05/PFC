package miapi.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import miapi.DTO.RecetaDTO;
import miapi.Service.RecetaService;
import miapi.Tables.Receta;

@RestController
@RequestMapping("/recetas")
@RequiredArgsConstructor
@Tag(name = "Recetas", description = "Gestion de recetas")
public class RecetaController {
    private final RecetaService recetaService;

@PostMapping("CrearReceta")
public ResponseEntity<Receta> crearReceta(
        @RequestBody(description = "Datos de la receta a crear", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                {
                  "usuario_id": 1,
                  "nombre": "Tortilla de patatas",
                  "instrucciones": "Batir los huevos, freír las patatas, mezclar todo y cocinar.",
                  "tiempo_preparacion": 30.0,
                  "dificultad": "Media",
                  "precio": 5.5
                }
                """))) @org.springframework.web.bind.annotation.RequestBody RecetaDTO recetaDTO) {

    Receta receta = recetaService.createReceta(recetaDTO);
    return new ResponseEntity<>(receta, HttpStatus.CREATED);
}


    @GetMapping("/{id}")
    public ResponseEntity<RecetaDTO> obtenerRecetaPorId(@PathVariable Integer id) {
        RecetaDTO recetaDTO = recetaService.buscarRecetaPorId(id);
        return new ResponseEntity<>(recetaDTO, HttpStatus.OK);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<RecetaDTO>> obtenerRecetasPorUsuario(@PathVariable Integer usuarioId) {
        List<RecetaDTO> recetas = recetaService.obtenerRecetasPorUsuarioId(usuarioId);
        return new ResponseEntity<>(recetas, HttpStatus.OK);
    }

    @DeleteMapping("/Eliminar/{id}")
    public ResponseEntity<Void> eliminarReceta(@PathVariable Integer id) {
        recetaService.eliminarRecetaPorId(id);
        return ResponseEntity.noContent().build(); // HTTP 204
    }

    @PutMapping("/{usuarioId}/{idReceta}")
    public ResponseEntity<RecetaDTO> actualizarReceta(
        @PathVariable Integer usuarioId,
        @PathVariable Integer idReceta,
        @RequestBody(description = "Datos actualizados de la receta (excepto id y usuario_id)",
                required = true,
                content = @Content(mediaType = "application/json",
                        schema = @Schema(example = """
                        {
                          "nombre": "Tortilla mejorada",
                          "instrucciones": "Batir bien los huevos, freír las patatas más crujientes, mezclar y cocinar.",
                          "tiempo_preparacion": 25.0,
                          "dificultad": "Media",
                          "precio": 6.0
                        }
                        """))) @org.springframework.web.bind.annotation.RequestBody RecetaDTO recetaDTO) {

    RecetaDTO actualizada = recetaService.actualizarReceta(usuarioId, idReceta, recetaDTO);
    return ResponseEntity.ok(actualizada);
}


}
