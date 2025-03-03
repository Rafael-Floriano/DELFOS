package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.exceptions.NotFoundException;
import br.com.rell.qdele_backend.repositories.DatabaseConnectionRepository;
import br.com.rell.qdele_backend.repositories.DatabaseStructureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DatabaseConnectionService {

    private final DatabaseConnectionRepository databaseConnectionRepository;
    private final DatabaseStructureRepository databaseStructureRepository;

    public DatabaseConnection findDatabaseConnection(final Long databaseConnectionId) {
        return databaseConnectionRepository.findById(databaseConnectionId).orElseThrow(() -> new NotFoundException("Database connection not found: " + databaseConnectionId));
    }

    public DatabaseConnection create(final DatabaseConnection databaseConnection) {
        return databaseConnectionRepository.save(
                databaseConnection
        );
    }

}
