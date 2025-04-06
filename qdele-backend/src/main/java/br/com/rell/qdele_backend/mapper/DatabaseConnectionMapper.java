package br.com.rell.qdele_backend.mapper;

import br.com.rell.qdele_backend.dto.DatabaseConnectionLabelRequest;
import br.com.rell.qdele_backend.dto.DatabaseConnectionRequest;
import br.com.rell.qdele_backend.entities.DatabaseConnection;

import javax.xml.crypto.Data;
import java.time.LocalDateTime;

public class DatabaseConnectionMapper {

    public static DatabaseConnection toEntity(DatabaseConnectionRequest request) {
        DatabaseConnection entity = new DatabaseConnection();
        entity.setName(request.name());
        entity.setUrl(request.host());
        entity.setPort(request.port());
        entity.setUsername(request.username());
        entity.setPassword(request.password());
        entity.setDatabaseType(request.type());

        entity.setCreatedDate(LocalDateTime.now());
        entity.setDeleted(false);

        return entity;
    }

    public static DatabaseConnectionLabelRequest ToDto(DatabaseConnection databaseConnection) {
        return new DatabaseConnectionLabelRequest(
                databaseConnection.getId(),
                databaseConnection.getName()
        );
    }


}
