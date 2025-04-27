package br.com.rell.qdele_backend.gateway;

import br.com.rell.qdele_backend.dto.McpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class McpDatabaseGateway {
    
    private final WebClient mcpWebClient;
    private final ObjectMapper objectMapper;

    public McpResponse callMcpApi(final String question, final String databaseUrl) {
        try {
            String response = mcpWebClient.post()
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
            
            log.info("Raw response from MCP: {}", response);
            
            // Primeira etapa: deserializar o objeto externo
            Map<String, String> outerObject = objectMapper.readValue(response, new TypeReference<Map<String, String>>() {});
            
            // Segunda etapa: deserializar o JSON dentro do campo "response"
            List<Map<String, Object>> data = objectMapper.readValue(
                outerObject.get("response"), 
                new TypeReference<List<Map<String, Object>>>() {}
            );
            
            return new McpResponse(data);
        } catch (Exception e) {
            log.error("Error calling MCP API", e);
            throw new RuntimeException("Error calling MCP API", e);
        }
    }

    public McpResponse callMcpApiUsingDefaultDatabase(final String question) {
        try {
            String response = mcpWebClient.post()
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
            
            log.info("Raw response from MCP: {}", response);
            
            // Primeira etapa: deserializar o objeto externo
            Map<String, String> outerObject = objectMapper.readValue(response, new TypeReference<Map<String, String>>() {});
            
            // Segunda etapa: deserializar o JSON dentro do campo "response"
            List<Map<String, Object>> data = objectMapper.readValue(
                outerObject.get("response"), 
                new TypeReference<List<Map<String, Object>>>() {}
            );
            
            return new McpResponse(data);
        } catch (Exception e) {
            log.error("Error calling MCP API", e);
            throw new RuntimeException("Error calling MCP API", e);
        }
    }
}
