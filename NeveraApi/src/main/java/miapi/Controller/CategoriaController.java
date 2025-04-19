package miapi.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import miapi.Service.CategoriaService;
import miapi.Tables.Categoria;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
@Tag(name = "categoria_alimentos", description = "Registro de categorias")
public class CategoriaController {
    private final CategoriaService categoriaService;

    @PostMapping("/crearCategoria")
    @Operation(summary = "Crear categoria", description = "Crea una nueva categoria en el sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Categoria creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),
    })
    public ResponseEntity<Categoria> crearCategoria(
            @RequestBody(description = "Datos de la receta a crear", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                    {
                      "nombre": "Azucares",
                      "vida_promedio_dias": 100
                    }
                    """))) @org.springframework.web.bind.annotation.RequestBody Categoria categoria) {

        categoriaService.createCategoria(categoria);
        return new ResponseEntity<>(categoria, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminarCategoria/{id}")
    @Operation(summary = "Eliminar categoría", description = "Elimina una categoría del sistema por su ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Categoría eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
    })
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Integer id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok().build();
    }

}
