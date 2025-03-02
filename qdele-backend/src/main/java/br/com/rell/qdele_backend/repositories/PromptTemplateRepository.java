package br.com.rell.qdele_backend.repositories;

import br.com.rell.qdele_backend.entities.PromptTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromptTemplateRepository extends JpaRepository<PromptTemplate, Long> {
}
