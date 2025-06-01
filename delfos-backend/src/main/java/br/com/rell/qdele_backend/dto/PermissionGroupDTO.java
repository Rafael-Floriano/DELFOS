package br.com.rell.qdele_backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class PermissionGroupDTO {
    private Long id;
    private String name;
    private String description;
    private Set<PermissionDTO> permissions;
} 