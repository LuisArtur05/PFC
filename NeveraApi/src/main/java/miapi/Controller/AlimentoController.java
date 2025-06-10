package miapi.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import miapi.DTO.AlimentoDTO;
import miapi.Service.AlimentoService;
import miapi.Tables.Alimento;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/alimento")
@RequiredArgsConstructor
@Tag(name = "Alimentos", description = "Gestion de alimentos")
public class AlimentoController {
        private final AlimentoService alimentoService;

        @PostMapping("/crearAlimento/nevera")
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
                                          "ubicacion":"Frigorifico",
                                          "precio": 3,
                                          "proveedor": "Mercadona"


                                        }
                                        """))) @org.springframework.web.bind.annotation.RequestBody AlimentoDTO alimentoDTO) {

                Alimento alimento = alimentoService.createAlimento(alimentoDTO);
                return new ResponseEntity<>(alimento, HttpStatus.CREATED);
        }

        @PostMapping("/crearAlimento/lista")
        @Operation(summary = "Crear alimento", description = "Crea un nuevo alimento en el sistema")
        @ApiResponses({
                        @ApiResponse(responseCode = "201", description = "Alimento creado exitosamente"),
                        @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),

        })

        public ResponseEntity<Alimento> crearAlimentoLista(

                        @RequestBody(description = "Datos del alimento a crear", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                                        {
                                          "usuario_id": 1,
                                          "categoria_id":5,
                                          "nombre": "leche",
                                          "fecha_caducidad": "2025-04-11",
                                          "cantidad":2,
                                          "ubicacion":"Frigorifico",
                                          "precio": 3,
                                          "proveedor": "Mercadona"


                                        }
                                        """))) @org.springframework.web.bind.annotation.RequestBody AlimentoDTO alimentoDTO2) {

                Alimento alimento = alimentoService.createAlimentoLista(alimentoDTO2);
                return new ResponseEntity<>(alimento, HttpStatus.CREATED);
        }

        @DeleteMapping("/eliminarAlimento/{id}")
        @Operation(summary = "Eliminar alimento", description = "Elimina un alimento existente por su ID")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Alimento eliminado exitosamente"),
                        @ApiResponse(responseCode = "404", description = "Alimento no encontrado")
        })
        public ResponseEntity<String> eliminarAlimento(@PathVariable Integer id) {
                try {
                        alimentoService.eliminarAlimento(id);
                        return ResponseEntity.ok("Alimento eliminado exitosamente");
                } catch (EntityNotFoundException e) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
                }
        }

        @PutMapping("/actualizarAlimento/{id_alimento}/{usuario_id}")
        @Operation(summary = "Actualizar alimento", description = "Actualiza un alimento existente. No se pueden modificar los campos id_alimento ni usuario_id.")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Alimento actualizado exitosamente"),
                        @ApiResponse(responseCode = "404", description = "Alimento no encontrado o no pertenece al usuario")
        })
        public ResponseEntity<Alimento> actualizarAlimento(
                        @PathVariable Integer id_alimento,
                        @PathVariable Integer usuario_id,
                        @RequestBody(description = "Datos del alimento a actualizar", content = @Content(mediaType = "application/json", schema = @Schema(example = """
                                        {
                                          "categoria_id": 4,
                                          "nombre": "Leche Desnatada",
                                          "fecha_caducidad": "2025-05-10",
                                          "cantidad": 3,
                                          "ubicacion": "Frigorifico",
                                          "precio": 3,
                                          "proveedor": "Mercadona"
                                        }
                                        """))) @org.springframework.web.bind.annotation.RequestBody AlimentoDTO alimentoDTO) {

                try {
                        Alimento actualizado = alimentoService.actualizarAlimento(id_alimento, usuario_id, alimentoDTO);
                        return ResponseEntity.ok(actualizado);
                } catch (EntityNotFoundException e) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }
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

        @GetMapping("/BuscarAlimentosPorUsuario/nevera/{usuarioId}")
        @Operation(summary = "Buscar alimentos por ID de usuario", description = "Devuelve todos los alimentos de un usuario")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Alimentos encontrados"),
                        @ApiResponse(responseCode = "404", description = "No se encontraron alimentos o usuario no existe"),
        })
        public ResponseEntity<List<AlimentoDTO>> obtenerAlimentosPorUsuario(@PathVariable Integer usuarioId) {
                List<AlimentoDTO> alimentos = alimentoService.obtenerAlimentosPorUsuario(usuarioId);

                if (alimentos.isEmpty()) {
                        return ResponseEntity.notFound().build(); // Devuelve un 404 si no se encuentran alimentos
                }

                return ResponseEntity.ok(alimentos); // Devuelve la lista de alimentos con un 200 OK
        }

        @GetMapping("/BuscarAlimentosPorUsuario/lista/{usuarioId}")
        @Operation(summary = "Buscar alimentos por ID de usuario", description = "Devuelve todos los alimentos de un usuario")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Alimentos encontrados"),
                        @ApiResponse(responseCode = "404", description = "No se encontraron alimentos o usuario no existe"),
        })
        public ResponseEntity<List<AlimentoDTO>> obtenerAlimentosPorUsuarioYLista(@PathVariable Integer usuarioId) {
                List<AlimentoDTO> alimentos = alimentoService.obtenerAlimentosPorUsuarioYLista(usuarioId);

                if (alimentos.isEmpty()) {
                        return ResponseEntity.notFound().build(); // Devuelve un 404 si no se encuentran alimentos
                }

                return ResponseEntity.ok(alimentos); // Devuelve la lista de alimentos con un 200 OK
        }

        @GetMapping("/PrecioPorUbicacion/{usuarioId}")
        @Operation(summary = "Obtener suma de precios por ubicación", description = "Devuelve el precio total por ubicación de los alimentos del usuario")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Precios por ubicación obtenidos"),
                        @ApiResponse(responseCode = "404", description = "Usuario sin alimentos")
        })
        public ResponseEntity<Map<String, Float>> getPrecioPorUbicacion(@PathVariable Integer usuarioId) {
                Map<String, Float> precios = alimentoService.obtenerPrecioPorUbicacion(usuarioId);

                if (precios.isEmpty()) {
                        return ResponseEntity.notFound().build();
                }

                return ResponseEntity.ok(precios);
        }

        @GetMapping("/BuscarNombresAlimentosSinCaducar/{usuarioId}")
        @Operation(summary = "Nombres de alimentos sin caducar por ID de usuario", description = "Devuelve solo los nombres de los alimentos cuya fecha de caducidad es mayor que la actual")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Nombres encontrados (puede ser una lista vacía)"),
                        @ApiResponse(responseCode = "404", description = "Usuario no existe"),
        })
        public ResponseEntity<List<String>> obtenerNombresAlimentosSinCaducar(@PathVariable Integer usuarioId) {
                List<String> nombres = alimentoService.obtenerNombresAlimentosSinCaducarPorUsuario(usuarioId);

                // Suponiendo que si el usuario no existe se lanza una excepción o se maneja de
                // otra forma en el servicio.
                return ResponseEntity.ok(nombres); // Devuelve 200 con lista vacía si no hay alimentos
        }

        @PutMapping("/cambiarNeveraALista/{usuarioId}/{alimentoId}")
        @Operation(summary = "Mover alimento de nevera a lista", description = "Cambia nevera_active a 0 y lista_active a 1")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Estado del alimento actualizado"),
                        @ApiResponse(responseCode = "404", description = "Alimento no encontrado o no pertenece al usuario")
        })
        public ResponseEntity<String> cambiarNeveraALista(
                        @PathVariable Integer usuarioId,
                        @PathVariable Integer alimentoId) {
                try {
                        alimentoService.cambiarNeveraALista(usuarioId, alimentoId);
                        return ResponseEntity.ok("Alimento actualizado: movido de nevera a lista.");
                } catch (EntityNotFoundException e) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
                }
        }

        @PutMapping("/cambiarListaANevera/{usuarioId}/{alimentoId}")
        @Operation(summary = "Mover alimento de lista a nevera", description = "Cambia lista_active a 0 y nevera_active a 1")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", description = "Estado del alimento actualizado"),
                        @ApiResponse(responseCode = "404", description = "Alimento no encontrado o no pertenece al usuario")
        })
        public ResponseEntity<String> cambiarListaANevera(
                        @PathVariable Integer usuarioId,
                        @PathVariable Integer alimentoId) {
                try {
                        alimentoService.cambiarListaANevera(usuarioId, alimentoId);
                        return ResponseEntity.ok("Alimento actualizado: movido de lista a nevera.");
                } catch (EntityNotFoundException e) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
                }
        }

}
