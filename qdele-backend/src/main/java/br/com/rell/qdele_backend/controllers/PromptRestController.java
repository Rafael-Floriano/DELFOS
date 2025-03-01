package br.com.rell.qdele_backend.controllers;

import br.com.rell.qdele_backend.services.PromptService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/prompt")
public class PromptRestController {

    @Autowired
    private PromptService promptService;

    @PostMapping
    public String generatePrompt(@RequestBody final String prompt) {
        return promptService.process(
                prompt
        );
    }

}
