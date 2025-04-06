package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.dto.DatabaseConnectionLabelRequest;
import br.com.rell.qdele_backend.dto.DatabaseConnectionRequest;
import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.exceptions.NotFoundException;
import br.com.rell.qdele_backend.mapper.DatabaseConnectionMapper;
import br.com.rell.qdele_backend.repositories.DatabaseConnectionRepository;
import br.com.rell.qdele_backend.repositories.DatabaseStructureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DatabaseConnectionService {

    private final DatabaseConnectionRepository databaseConnectionRepository;
    private final DatabaseStructureRepository databaseStructureRepository;

    public DatabaseConnection findDatabaseConnection(final Long databaseConnectionId) {
        return databaseConnectionRepository.findById(databaseConnectionId)
                .orElseThrow(() -> new NotFoundException("Database connection not found: " + databaseConnectionId));
    }

    public DatabaseConnection create(final DatabaseConnectionRequest databaseConnectionRequest) {
        final DatabaseConnection databaseConnection = DatabaseConnectionMapper.toEntity(databaseConnectionRequest);
        log.info("Creating a new database connection: {}", databaseConnection.getName());
        databaseConnection.setCreatedDate(LocalDateTime.now());
        databaseConnection.setDeleted(false);
        return databaseConnectionRepository.save(databaseConnection);
    }

    public List<DatabaseConnection> getAll() {
        log.info("Fetching all database connections");
        return databaseConnectionRepository.findAll();
    }

    public List<DatabaseConnectionLabelRequest> getDatabaseConnections() {
        return databaseConnectionRepository.findAll().stream().map(DatabaseConnectionMapper::ToDto).toList();
    }

    public DatabaseConnection getById(final Long id) {
        log.info("Fetching database connection with ID: {}", id);
        return databaseConnectionRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new NotFoundException("Database connection not found with ID: " + id));
    }

    public DatabaseConnection update(final Long id, final DatabaseConnection databaseConnectionDetails) {
        log.info("Updating database connection with ID: {}", id);

        DatabaseConnection existingConnection = getById(id);
        existingConnection.setName(databaseConnectionDetails.getName());
        existingConnection.setUrl(databaseConnectionDetails.getUrl());
        existingConnection.setPort(databaseConnectionDetails.getPort());
        existingConnection.setUsername(databaseConnectionDetails.getUsername());
        existingConnection.setPassword(databaseConnectionDetails.getPassword());
        existingConnection.setDatabaseType(databaseConnectionDetails.getDatabaseType());
        existingConnection.setModifiedBy(databaseConnectionDetails.getModifiedBy());
        existingConnection.setModifiedDate(LocalDateTime.now());

        return databaseConnectionRepository.save(existingConnection);
    }

    public void softDelete(final Long id) {
        log.info("Soft deleting database connection with ID: {}", id);

        DatabaseConnection connection = getById(id);
        connection.setDeleted(true);
        databaseConnectionRepository.save(connection);
    }
}