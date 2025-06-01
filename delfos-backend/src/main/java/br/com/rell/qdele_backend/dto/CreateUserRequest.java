package br.com.rell.qdele_backend.dto;

import lombok.Data;
import java.util.Set;

@Data
public class CreateUserRequest {
    private String username;
    private String password;
    private Set<Long> permissionGroupIds;
} 