package br.com.rell.qdele_backend.controllers;

import br.com.rell.qdele_backend.dto.PermissionGroupDTO;
import br.com.rell.qdele_backend.services.PermissionGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permission-groups")
@RequiredArgsConstructor
public class PermissionGroupController {
    private final PermissionGroupService permissionGroupService;

    @GetMapping
    public ResponseEntity<List<PermissionGroupDTO>> getAllPermissionGroups() {
        return ResponseEntity.ok(permissionGroupService.getAllPermissionGroups());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PermissionGroupDTO> getPermissionGroupById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionGroupService.getPermissionGroupById(id));
    }

    @PostMapping
    public ResponseEntity<PermissionGroupDTO> createPermissionGroup(@RequestBody PermissionGroupDTO groupDTO) {
        return ResponseEntity.ok(permissionGroupService.createPermissionGroup(groupDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PermissionGroupDTO> updatePermissionGroup(@PathVariable Long id, @RequestBody PermissionGroupDTO groupDTO) {
        return ResponseEntity.ok(permissionGroupService.updatePermissionGroup(id, groupDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePermissionGroup(@PathVariable Long id) {
        permissionGroupService.deletePermissionGroup(id);
        return ResponseEntity.ok().build();
    }
} 