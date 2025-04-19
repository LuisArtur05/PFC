package miapi.Tables;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categorias_alimentos")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria_alimento")
    private Integer id_categoria_alimento;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "vida_promedio_dias", nullable = false)
    private Integer vida_promedio_dias;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    private List <Alimento> alimentos;

   
}
