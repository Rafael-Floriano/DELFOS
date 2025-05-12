package br.com.rell.qdele_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "database_connection")
public class DatabaseConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String url;
    @Column(nullable = false)
    private Integer port;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "database_type", nullable = false)
    private DatabaseType databaseType;

    private String createdBy;
    private LocalDateTime createdDate;
    private String modifiedBy;
    private LocalDateTime modifiedDate;
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean deleted;

    @Column(name = "database_url", nullable = false)
    private String databaseUrlCompletedUrl;

    @PrePersist
    public void prePersist() {
        this.databaseUrlCompletedUrl = this.url + ":" + this.port;
    }

    @PreUpdate
    public void preUpdate() {
        this.databaseUrlCompletedUrl = this.url + ":" + this.port;
    }
}

