package miapi.Tables;

import jakarta.persistence.*;
import lombok.*;
import miapi.Config.Dificultad;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "recetas")
public class Receta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_receta")
    private Integer id_receta;

    @ManyToOne
    @JoinColumn(name = "usuario_id",nullable = false)
    private  Usuario usuario;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "instrucciones", nullable = false)
    private String instrucciones;

    @Column(name = "tiempo_preparacion", nullable = false)
    private Float tiempo_preparacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "dificultad", nullable = false)
    private Dificultad dificultad;

    @Column(name="precio",nullable = false)
    private Float precio;

    @Column(name = "ingredientes", nullable = false)
    private String ingredientes;

    
}
