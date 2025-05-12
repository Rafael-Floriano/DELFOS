package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.dto.McpResponse;
import br.com.rell.qdele_backend.gateway.McpDatabaseGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PromptService {

    private final McpDatabaseGateway mcpDatabaseGateway;

    public McpResponse process(final Long databaseConnectionId, final String userRequest) {
        return mcpDatabaseGateway.callMcpApiUsingDefaultDatabase(userRequest);
    }

}
