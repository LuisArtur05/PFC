package miapi.Tables;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miapi.Config.Ubicacion;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "alimentos")
public class Alimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alimento")
    private Integer id_alimento;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "fecha_caducidad", nullable = false)
    private java.sql.Date fecha_caducidad;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "ubicacion", nullable = false)
    private Ubicacion ubicacion;

    @Column(name = "precio", nullable = false)
    private Float precio;

    @Column(name = "proveedor", nullable = false)
    private String proveedor;

    @Column(name = "lista_active", nullable = false)
    private Integer lista_active;

     @Column(name = "nevera_active", nullable = false)
    private Integer nevera_active;



}
