package br.com.rell.qdele_backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "prompt_template")
public class PromptTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean deleted;

    public PromptTemplate(String content) {
        this.content = content;
    }

    @PrePersist
    public void prePersist() {
        if (this.deleted == null) {
            this.deleted = false;
        }
    }

    @PreUpdate
    public void preUpdate() {
        if (this.deleted == null) {
            this.deleted = false;
        }
    }

}
