package br.com.rell.qdele_backend.config;

import br.com.rell.qdele_backend.entities.Permission;
import br.com.rell.qdele_backend.entities.PermissionGroup;
import br.com.rell.qdele_backend.entities.User;
import br.com.rell.qdele_backend.repositories.PermissionGroupRepository;
import br.com.rell.qdele_backend.repositories.PermissionRepository;
import br.com.rell.qdele_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PermissionRepository permissionRepository;
    private final PermissionGroupRepository permissionGroupRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create permissions if they don't exist
        Arrays.stream(Permission.Type.values()).forEach(type -> {
            if (!permissionRepository.findByType(type).isPresent()) {
                Permission permission = new Permission();
                permission.setName(type.name());
                permission.setDescription(getDescriptionForType(type));
                permission.setType(type);
                permissionRepository.save(permission);
            }
        });

        // Create default permission groups
        createDefaultGroups();

        // Create admin user if it doesn't exist
        if (!userRepository.findByUsername("admin").isPresent()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123")); // You should change this password
            admin.setPermissionGroups(new HashSet<>(Arrays.asList(
                permissionGroupRepository.findByName("ADMIN").orElseThrow()
            )));
            userRepository.save(admin);
        }
    }

    private void createDefaultGroups() {
        // Get all permissions
        Set<Permission> allPermissions = new HashSet<>(permissionRepository.findAll());

        // Create ADMIN group with all permissions
        createOrUpdateGroup("ADMIN", "Administrator group with all permissions", allPermissions);

        // Create READER group with view permissions
        createOrUpdateGroup("READER", "Basic read-only access", Set.of(
            findPermissionByType(Permission.Type.VIEW_USERS),
            findPermissionByType(Permission.Type.USE_CONNECTIONS)
        ));

        // Create MANAGER group with management permissions
        createOrUpdateGroup("MANAGER", "Management access without full admin rights", Set.of(
            findPermissionByType(Permission.Type.VIEW_USERS),
            findPermissionByType(Permission.Type.USE_CONNECTIONS),
            findPermissionByType(Permission.Type.MANAGE_CONNECTIONS)
        ));

        // Create DEVELOPER group with connection access
        createOrUpdateGroup("DEVELOPER", "Developer access with connection management", Set.of(
            findPermissionByType(Permission.Type.USE_CONNECTIONS),
            findPermissionByType(Permission.Type.MANAGE_CONNECTIONS)
        ));
    }

    private void createOrUpdateGroup(String name, String description, Set<Permission> permissions) {
        PermissionGroup group = permissionGroupRepository.findByName(name)
                .orElseGet(() -> {
                    PermissionGroup newGroup = new PermissionGroup();
                    newGroup.setName(name);
                    return newGroup;
                });
        
        group.setDescription(description);
        group.setPermissions(permissions);
        permissionGroupRepository.save(group);
    }

    private Permission findPermissionByType(Permission.Type type) {
        return permissionRepository.findByType(type)
                .orElseThrow(() -> new RuntimeException("Permission not found: " + type));
    }

    private String getDescriptionForType(Permission.Type type) {
        switch (type) {
            case MANAGE_CONNECTIONS:
                return "Can create, edit, delete connections";
            case MANAGE_USERS:
                return "Can create, edit, delete users";
            case VIEW_USERS:
                return "Can view other users";
            case USE_CONNECTIONS:
                return "Can view and use database connections";
            default:
                return type.name();
        }
    }
} 