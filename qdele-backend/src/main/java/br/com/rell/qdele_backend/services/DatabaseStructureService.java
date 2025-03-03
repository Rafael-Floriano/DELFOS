package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import br.com.rell.qdele_backend.entities.DatabaseStructure;
import br.com.rell.qdele_backend.entities.DatabaseType;
import br.com.rell.qdele_backend.repositories.DatabaseStructureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DatabaseStructureService {

    private final DatabaseStructureRepository databaseStructureRepository;
    private final DatabaseConnectionService databaseConnectionService;

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
            JSONArray tablesArray = new JSONArray();

            jdbcTemplate.queryForList("""
            SELECT table_name, column_name, data_type, character_maximum_length 
            FROM information_schema.columns
            WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
            ORDER BY table_name, ordinal_position;
            """)
                    .forEach(row -> {
                        JSONObject tableInfo = new JSONObject();
                        tableInfo.put("table_name", row.get("table_name"));
                        tableInfo.put("column_name", row.get("column_name"));
                        tableInfo.put("data_type", row.get("data_type"));
                        tableInfo.put("character_maximum_length", row.get("character_maximum_length"));
                        tablesArray.put(tableInfo);
                    });

            databaseStructureRepository.save(
                    new DatabaseStructure(null, tablesArray.toString(), databaseConnection.getId(), false)
            );

            return tablesArray.toString();
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
