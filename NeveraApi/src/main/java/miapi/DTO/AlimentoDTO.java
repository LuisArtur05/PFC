package miapi.DTO;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miapi.Config.Ubicacion;

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
    private Float precio;
    private String proveedor;
    private Integer lista_active;
    private Integer nevera_active;
}
