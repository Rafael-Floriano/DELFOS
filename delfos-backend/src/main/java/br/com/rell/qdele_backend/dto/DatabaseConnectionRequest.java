package br.com.rell.qdele_backend.dto;

import br.com.rell.qdele_backend.entities.DatabaseType;

public record DatabaseConnectionRequest(
        String name,
        String url,
        int port,
        String username,
        String password,
        DatabaseType databaseType
) {
}
