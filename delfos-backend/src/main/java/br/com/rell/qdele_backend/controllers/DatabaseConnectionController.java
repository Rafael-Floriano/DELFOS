package br.com.rell.qdele_backend.controllers;

import br.com.rell.qdele_backend.dto.DatabaseConnectionLabelRequest;
import br.com.rell.qdele_backend.dto.DatabaseConnectionRequest;
import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.services.DatabaseConnectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/database-connections")
public class DatabaseConnectionController {

    private final DatabaseConnectionService databaseConnectionService;

    @PostMapping
    public ResponseEntity<DatabaseConnection> create(@RequestBody DatabaseConnectionRequest databaseConnectionRequest) {
        DatabaseConnection createdConnection = databaseConnectionService.create(databaseConnectionRequest);
        return ResponseEntity.ok(createdConnection);
    }

    @GetMapping
    public ResponseEntity<List<DatabaseConnection>> getAll() {
        List<DatabaseConnection> connections = databaseConnectionService.getAll();
        return ResponseEntity.ok(connections);
    }

    @GetMapping("/all")
    public List<DatabaseConnectionLabelRequest> getDatabaseConnections() {
        return databaseConnectionService.getDatabaseConnections();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatabaseConnection> getById(@PathVariable Long id) {
        DatabaseConnection connection = databaseConnectionService.getById(id);
        return ResponseEntity.ok(connection);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DatabaseConnection> update(@PathVariable Long id, @RequestBody DatabaseConnection databaseConnection) {
        DatabaseConnection updatedConnection = databaseConnectionService.update(id, databaseConnection);
        return ResponseEntity.ok(updatedConnection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        databaseConnectionService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
}