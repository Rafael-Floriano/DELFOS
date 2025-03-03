package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.entities.PromptTemplate;
import br.com.rell.qdele_backend.repositories.PromptTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromptTemplateService {

    private final PromptTemplateRepository promptTemplateRepository;

    private String promptDefaultTemplate = """
            # Context
                
            Database: {database}
            Version: Undefined
                        
            ## Relevant Tables for the Query
                        
            {database_tables}
                        
            ---
                        
            # User Request
            {user_request}
                        
            ---
                        
            # Response Format
            Only return the SQL query.
            """;

    public String findDefaultPromptTemplate() {
        List<PromptTemplate> promptTemplateList = promptTemplateRepository.findAll();
        if (promptTemplateList.isEmpty()) {
            promptTemplateRepository.save(
                    new PromptTemplate(
                            promptDefaultTemplate
                    )
            );
            return promptDefaultTemplate;
        }
        return promptTemplateList.get(0).getContent();
    }

}
