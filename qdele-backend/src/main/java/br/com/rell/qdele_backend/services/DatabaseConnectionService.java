package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.repositories.DatabaseConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseConnectionService {

    @Autowired
    private DatabaseConnectionRepository databaseConnectionRepository;

    public DatabaseConnection findDatabaseConnection(final Long databaseConnectionId) {
        return databaseConnectionRepository.findById(databaseConnectionId).orElseThrow();
    }

}
