package br.com.rell.qdele_backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private Set<PermissionGroupDTO> permissionGroups;
    private Set<PermissionDTO> allPermissions;
} 