package miapi.DTO;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miapi.Ubicacion;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlimentoDTO {
    private Integer id_alimento;
    private Integer usuario_id;
    private Integer categoria_id;
    private String nombre;
    private Date fecha_caducidad;
    private Integer cantidad;
    private Ubicacion ubicacion;
}
