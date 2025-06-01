package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.dto.PermissionDTO;
import br.com.rell.qdele_backend.entities.Permission;
import br.com.rell.qdele_backend.repositories.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissionService {
    private final PermissionRepository permissionRepository;

    public List<PermissionDTO> getAllPermissions() {
        return permissionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PermissionDTO getPermissionById(Long id) {
        return permissionRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
    }

    public PermissionDTO createPermission(PermissionDTO permissionDTO) {
        Permission permission = new Permission();
        permission.setName(permissionDTO.getName());
        permission.setDescription(permissionDTO.getDescription());
        permission.setType(permissionDTO.getType());
        
        return convertToDTO(permissionRepository.save(permission));
    }

    public PermissionDTO updatePermission(Long id, PermissionDTO permissionDTO) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
        
        permission.setName(permissionDTO.getName());
        permission.setDescription(permissionDTO.getDescription());
        permission.setType(permissionDTO.getType());
        
        return convertToDTO(permissionRepository.save(permission));
    }

    public void deletePermission(Long id) {
        permissionRepository.deleteById(id);
    }

    public PermissionDTO convertToDTO(Permission permission) {
        PermissionDTO dto = new PermissionDTO();
        dto.setId(permission.getId());
        dto.setName(permission.getName());
        dto.setDescription(permission.getDescription());
        dto.setType(permission.getType());
        return dto;
    }
} 