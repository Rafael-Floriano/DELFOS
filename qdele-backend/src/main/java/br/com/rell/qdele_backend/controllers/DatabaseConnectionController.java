package br.com.rell.qdele_backend.controllers;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.services.DatabaseConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/database-connection")
public class DatabaseConnectionController {

    @Autowired
    private DatabaseConnectionService databaseConnectionService;

    @PostMapping
    public void create(@RequestBody final DatabaseConnection databaseConnection) {
        databaseConnectionService.create(databaseConnection);
    }

}
