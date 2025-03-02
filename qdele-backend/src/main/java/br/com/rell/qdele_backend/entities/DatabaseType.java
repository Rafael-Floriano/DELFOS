package br.com.rell.qdele_backend.entities;

import lombok.ToString;

@ToString
public enum DatabaseType {
    POSTGRESQL, FIREBIRD, MARIADB, MYSQL;
}
