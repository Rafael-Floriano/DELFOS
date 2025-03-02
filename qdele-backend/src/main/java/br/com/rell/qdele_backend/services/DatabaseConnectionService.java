package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.repositories.DatabaseConnectionRepository;
import br.com.rell.qdele_backend.repositories.DatabaseStructureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DatabaseConnectionService {

    @Autowired
    private DatabaseConnectionRepository databaseConnectionRepository;
    @Autowired
    private DatabaseStructureRepository databaseStructureRepository;

    public DatabaseConnection findDatabaseConnection(final Long databaseConnectionId) {
        return databaseConnectionRepository.findById(databaseConnectionId).orElseThrow(() -> new RuntimeException("Database connection not found: " + databaseConnectionId));
    }

    public DatabaseConnection create(final DatabaseConnection databaseConnection) {
        return databaseConnectionRepository.save(
                databaseConnection
        );
    }

}
