package br.com.rell.qdele_backend.gateway;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class McpDatabaseGateway {
    
    private final WebClient mcpWebClient;

    public String callMcpApi(final String question, final String databaseUrl) {
        try {
            return mcpWebClient.post()
            .uri("/ask")
            .bodyValue(
                new Question(
                    question,
                    databaseUrl
                )
            )
            .retrieve()
            .bodyToMono(String.class)
            .block();
        } catch (Exception e) {
            throw new RuntimeException("Error calling MCP API", e);
        }
    }

    public String callMcpApiUsingDefaultDatabase(final String question) {
        try {
            return mcpWebClient.post()
            .uri("/ask")
            .bodyValue(
                new Question(
                    question,
                    null
                )
            )
            .retrieve()
            .bodyToMono(String.class)
            .block();
        } catch (Exception e) {
            throw new RuntimeException("Error calling MCP API", e);
        }
    }
}
