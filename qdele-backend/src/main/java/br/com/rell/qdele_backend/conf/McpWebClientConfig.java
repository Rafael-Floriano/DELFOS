package br.com.rell.qdele_backend.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class McpWebClientConfig {
    
    @Bean
    public WebClient mcpWebClient() {
        return WebClient.builder()
            .baseUrl("http://localhost:3001") // TODO: change url to env variable
            .build();
    }

}
