package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.dto.PermissionDTO;
import br.com.rell.qdele_backend.dto.PermissionGroupDTO;
import br.com.rell.qdele_backend.entities.Permission;
import br.com.rell.qdele_backend.entities.PermissionGroup;
import br.com.rell.qdele_backend.repositories.PermissionGroupRepository;
import br.com.rell.qdele_backend.repositories.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissionGroupService {
    private final PermissionGroupRepository permissionGroupRepository;
    private final PermissionRepository permissionRepository;
    private final PermissionService permissionService;

    public List<PermissionGroupDTO> getAllPermissionGroups() {
        return permissionGroupRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PermissionGroupDTO getPermissionGroupById(Long id) {
        return permissionGroupRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Permission group not found"));
    }

    public PermissionGroupDTO createPermissionGroup(PermissionGroupDTO groupDTO) {
        PermissionGroup group = new PermissionGroup();
        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());
        
        if (groupDTO.getPermissions() != null) {
            Set<Permission> permissions = groupDTO.getPermissions().stream()
                    .map(p -> permissionRepository.findById(p.getId())
                            .orElseThrow(() -> new RuntimeException("Permission not found: " + p.getId())))
                    .collect(Collectors.toSet());
            group.setPermissions(permissions);
        }
        
        return convertToDTO(permissionGroupRepository.save(group));
    }

    public PermissionGroupDTO updatePermissionGroup(Long id, PermissionGroupDTO groupDTO) {
        PermissionGroup group = permissionGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission group not found"));
        
        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());
        
        if (groupDTO.getPermissions() != null) {
            Set<Permission> permissions = groupDTO.getPermissions().stream()
                    .map(p -> permissionRepository.findById(p.getId())
                            .orElseThrow(() -> new RuntimeException("Permission not found: " + p.getId())))
                    .collect(Collectors.toSet());
            group.setPermissions(permissions);
        }
        
        return convertToDTO(permissionGroupRepository.save(group));
    }

    public void deletePermissionGroup(Long id) {
        permissionGroupRepository.deleteById(id);
    }

    private PermissionGroupDTO convertToDTO(PermissionGroup group) {
        PermissionGroupDTO dto = new PermissionGroupDTO();
        dto.setId(group.getId());
        dto.setName(group.getName());
        dto.setDescription(group.getDescription());
        
        Set<PermissionDTO> permissionDTOs = group.getPermissions().stream()
                .map(permissionService::convertToDTO)
                .collect(Collectors.toSet());
        dto.setPermissions(permissionDTOs);
        
        return dto;
    }
} 