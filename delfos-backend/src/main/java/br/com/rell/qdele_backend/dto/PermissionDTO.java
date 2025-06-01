package br.com.rell.qdele_backend.dto;

import br.com.rell.qdele_backend.entities.Permission;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDTO {
    private Long id;
    private String name;
    private String description;
    private Permission.Type type;

} 