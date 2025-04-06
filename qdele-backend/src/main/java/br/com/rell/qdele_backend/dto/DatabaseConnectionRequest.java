package br.com.rell.qdele_backend.dto;

import br.com.rell.qdele_backend.entities.DatabaseType;

public record DatabaseConnectionRequest(
        String name,
        String host,
        int port,
        String database,
        String username,
        String password,
        DatabaseType type
) {
}
