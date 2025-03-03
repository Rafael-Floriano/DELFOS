package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.DatabaseConnection;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class PromptService {

    private final IAiService ollamaService;
    private final PromptTemplateService promptTemplateService;
    private final DatabaseConnectionService databaseConnectionService;
    private final DatabaseStructureService databaseStructureService;

    public String process(final Long databaseConnectionId, final String userRequest) {

        final DatabaseConnection databaseConnection = databaseConnectionService.findDatabaseConnection(databaseConnectionId);
        final String structure = databaseStructureService.findStructureByDatabaseConnectionId(databaseConnectionId);

        return ollamaService.sendPrompt(
                mountPrompt(databaseConnection, structure, userRequest)
        );
    }

    public String mountPrompt(final DatabaseConnection databaseConnection, final String structure, final String userRequest) {
        String template = promptTemplateService.findDefaultPromptTemplate();
        template = template.replace("{database}", databaseConnection.getDatabaseType().toString());
        template = template.replace("{database_tables}", structure);
        template = template.replace("{user_request}", userRequest);
        return template;
    }
}
