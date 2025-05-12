package br.com.rell.qdele_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OllamaService implements IAiService {

    private final OllamaChatModel chatModel;

    @Override
    public String sendPrompt(final String prompt) {
        return chatModel.call(
                new Prompt(
                        prompt,
                        OllamaOptions.builder().model("llama3.2").build()
                )
        ).getResult().getOutput().getText();
    }

}
