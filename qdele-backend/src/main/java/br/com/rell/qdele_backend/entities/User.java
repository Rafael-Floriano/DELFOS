package br.com.rell.qdele_backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Table(name = "qdele_user")
@SQLRestriction("deleted = false")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    private String createdBy;
    private LocalDateTime createdDate;
    private String modifiedBy;
    private LocalDateTime modifiedDate;
    private Boolean deleted = false;

    public enum Role {
        SUPER, READER
    }


    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
