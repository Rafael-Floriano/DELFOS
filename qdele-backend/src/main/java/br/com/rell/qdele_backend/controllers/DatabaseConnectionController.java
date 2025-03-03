package br.com.rell.qdele_backend.controllers;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.services.DatabaseConnectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/database-connection")
public class DatabaseConnectionController {

    private final DatabaseConnectionService databaseConnectionService;

    @PostMapping
    public void create(@RequestBody final DatabaseConnection databaseConnection) {
        databaseConnectionService.create(databaseConnection);
    }

}
