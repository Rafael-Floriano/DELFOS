package br.com.rell.qdele_backend.repositories;

import br.com.rell.qdele_backend.entities.DatabaseStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseStructureRepository extends JpaRepository<DatabaseStructure, Long> {

    DatabaseStructure findByDatabaseConnectionId(final Long databaseConnectionId);

}
