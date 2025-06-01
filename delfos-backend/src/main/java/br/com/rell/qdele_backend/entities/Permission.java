package br.com.rell.qdele_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    public enum Type {
        MANAGE_CONNECTIONS,    // Can create, edit, delete connections
        MANAGE_USERS,         // Can create, edit, delete users
        VIEW_USERS,           // Can view other users
        USE_CONNECTIONS       // Can view and use database connections
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;
} 