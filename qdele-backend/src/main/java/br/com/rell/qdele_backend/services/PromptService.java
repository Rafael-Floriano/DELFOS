package br.com.rell.qdele_backend.services;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class PromptService {

    @Autowired
    private IAiService ollamaService;

    private String promptTemplate = """
            # Context
                
            Database: {database}
            Version: {database_version}
                        
            ## Relevant Tables for the Query
                        
            {database_tables}
                        
            ---
                        
            # User Request
            {user_request}
                        
            ---
                        
            # Response Format
            Only return the SQL query.
            """;

    private final String mockDatabase = "postgresSQL";
    private final String mockedDatabaseVersion = "15";
    private final String mockedDatabaseTables = """
            table_name	column_name	data_type	character_maximum_length
            cliente	id	integer	
            cliente	nome	character varying	100
            cliente	email	character varying	100
            cliente	telefone	character varying	20
            endereco	id	integer	
            endereco	cliente_id	integer	
            endereco	rua	character varying	150
            endereco	numero	character varying	10
            endereco	complemento	character varying	50
            endereco	bairro	character varying	100
            endereco	cidade	character varying	100
            endereco	estado	character varying	50
            endereco	pais	character varying	50
            endereco	cep	character varying	20
            """;


    public String process(final String userRequest) {
        return ollamaService.sendPrompt(
                mountPrompt(userRequest)
        );
    }

    public String mountPrompt(final String userRequest) {
        promptTemplate = promptTemplate.replace("{database}", mockDatabase);
        promptTemplate = promptTemplate.replace("{database_version}", mockedDatabaseVersion);
        promptTemplate = promptTemplate.replace("{database_tables}", mockedDatabaseTables);
        promptTemplate = promptTemplate.replace("{user_request}", userRequest);
        return promptTemplate;
    }
}
