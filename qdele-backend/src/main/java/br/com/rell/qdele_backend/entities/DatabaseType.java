package br.com.rell.qdele_backend.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.ToString;

@ToString
public enum DatabaseType {
    POSTGRESQL, FIREBIRD, MARIADB, MYSQL;

    @JsonCreator
    public static DatabaseType fromString(String database) {
        if (database == null || database.isBlank()) {
            return POSTGRESQL;
        }

        try {
            return DatabaseType.valueOf(database.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Unsupported database type: " + database);
        }
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }

}
