package br.com.rell.qdele_backend.controllers;

import br.com.rell.qdele_backend.services.PromptService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/prompt")
public class PromptRestController {

    private final PromptService promptService;

    @PostMapping
    public String generatePrompt(@RequestParam final Long databaseConnectionId, @RequestBody final String prompt) {
        return promptService.process(
                databaseConnectionId,
                prompt
        );
    }

}
