package br.com.rell.qdele_backend.repositories;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseConnectionRepository extends JpaRepository<DatabaseConnection, Long> {
}
