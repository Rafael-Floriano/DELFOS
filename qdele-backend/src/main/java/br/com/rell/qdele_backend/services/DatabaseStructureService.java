package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.entities.DatabaseStructure;
import br.com.rell.qdele_backend.entities.DatabaseType;
import br.com.rell.qdele_backend.repositories.DatabaseStructureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DatabaseStructureService {

    @Autowired
    private DatabaseStructureRepository databaseStructureRepository;
    @Autowired
    private DatabaseConnectionService databaseConnectionService;

    public String findStructureByDatabaseConnectionId(final Long databaseConnectionId) {
        final DatabaseStructure databaseStructure = databaseStructureRepository.findByDatabaseConnectionId(databaseConnectionId);
        if (databaseStructure != null) {
            return databaseStructure.getStructure();
        }
        return scanDataSource(databaseConnectionService.findDatabaseConnection(databaseConnectionId));
    }

    public String scanDataSource(final DatabaseConnection databaseConnection) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(getDriverClass(databaseConnection.getDatabaseType()));
        dataSource.setUrl(databaseConnection.getUrl());
        dataSource.setUsername(databaseConnection.getUsername());
        dataSource.setPassword(databaseConnection.getPassword());

        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        StringBuilder structure = new StringBuilder();

        try {
            jdbcTemplate.queryForList("""
                            SELECT table_name, column_name, data_type, character_maximum_length 
                            FROM information_schema.columns
                            WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
                            ORDER BY table_name, ordinal_position;
                            """)
                    .forEach(row -> structure.append(
                            String.format("Tabela: %s, Coluna: %s, Tipo: %s, Tamanho: %s\n",
                                    row.get("table_name"),
                                    row.get("column_name"),
                                    row.get("data_type"),
                                    row.get("character_maximum_length"))
                    ));
            databaseStructureRepository.save(
                    new DatabaseStructure(null, structure.toString(), databaseConnection.getId(), false)
            );
            return structure.toString();
        } catch (Exception e) {
            log.warn("Erro ao escanear o banco: {}", e.getMessage());
            return null;
        }
    }

    private String getDriverClass(DatabaseType databaseType) {
        return switch (databaseType) {
            case POSTGRESQL -> "org.postgresql.Driver";
            case MYSQL -> "com.mysql.cj.jdbc.Driver";
            default -> throw new IllegalArgumentException("Unsupported database type");
        };
    }
}
