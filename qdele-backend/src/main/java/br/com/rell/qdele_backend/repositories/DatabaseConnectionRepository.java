package br.com.rell.qdele_backend.repositories;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DatabaseConnectionRepository extends JpaRepository<DatabaseConnection, Long> {


    List<DatabaseConnection> findByDeletedFalse();

    Optional<DatabaseConnection> findByIdAndDeletedFalse(Long id);
}