package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.dto.PermissionDTO;
import br.com.rell.qdele_backend.dto.PermissionGroupDTO;
import br.com.rell.qdele_backend.dto.UserDTO;
import br.com.rell.qdele_backend.entities.PermissionGroup;
import br.com.rell.qdele_backend.entities.User;
import br.com.rell.qdele_backend.repositories.PermissionGroupRepository;
import br.com.rell.qdele_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PermissionGroupRepository permissionGroupRepository;
    private final PermissionService permissionService;
    private final PasswordEncoder passwordEncoder;

    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getUsername() == null || userDTO.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername().trim());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        
        if (userDTO.getPermissionGroups() != null) {
            Set<PermissionGroup> groups = userDTO.getPermissionGroups().stream()
                    .map(g -> permissionGroupRepository.findById(g.getId())
                            .orElseThrow(() -> new RuntimeException("Permission group not found: " + g.getId())))
                    .collect(Collectors.toSet());
            user.setPermissionGroups(groups);
        }
        
        return convertToDTO(userRepository.save(user));
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(userDTO.getUsername());
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        
        if (userDTO.getPermissionGroups() != null) {
            Set<PermissionGroup> groups = userDTO.getPermissionGroups().stream()
                    .map(g -> permissionGroupRepository.findById(g.getId())
                            .orElseThrow(() -> new RuntimeException("Permission group not found: " + g.getId())))
                    .collect(Collectors.toSet());
            user.setPermissionGroups(groups);
        }

        return convertToDTO(userRepository.save(user));
    }

    public void softDeleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDeleted(true);
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        
        Set<PermissionGroupDTO> groupDTOs = user.getPermissionGroups().stream()
                .map(group -> {
                    PermissionGroupDTO groupDTO = new PermissionGroupDTO();
                    groupDTO.setId(group.getId());
                    groupDTO.setName(group.getName());
                    groupDTO.setDescription(group.getDescription());
                    groupDTO.setPermissions(group.getPermissions().stream()
                            .map(permissionService::convertToDTO)
                            .collect(Collectors.toSet()));
                    return groupDTO;
                })
                .collect(Collectors.toSet());
        dto.setPermissionGroups(groupDTOs);
        
        Set<PermissionDTO> allPermissions = user.getAllPermissions().stream()
                .map(permissionService::convertToDTO)
                .collect(Collectors.toSet());
        dto.setAllPermissions(allPermissions);
        
        return dto;
    }
}
