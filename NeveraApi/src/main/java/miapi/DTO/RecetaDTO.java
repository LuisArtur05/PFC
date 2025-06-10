package miapi.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miapi.Config.Dificultad;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecetaDTO {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer id_receta;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer usuario_id;
    private String nombre;
    private String instrucciones;
    private Float tiempo_preparacion;
    private Dificultad dificultad;
    private Float precio;
    private String ingredientes;
    



}
