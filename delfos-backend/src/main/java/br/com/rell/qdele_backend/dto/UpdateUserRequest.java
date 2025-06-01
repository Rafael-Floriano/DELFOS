package br.com.rell.qdele_backend.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UpdateUserRequest {
    private String username;
    private String password; // opcional, só será atualizado se não for null
    private Set<Long> permissionGroupIds;
} 