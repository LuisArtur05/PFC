package miapi.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import miapi.Alimento;

@Repository
public interface AlimentoDAO extends JpaRepository<Alimento,Integer>{

}
