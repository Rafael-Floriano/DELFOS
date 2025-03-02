package br.com.rell.qdele_backend.services;

import br.com.rell.qdele_backend.repositories.DatabaseStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseStructureService {

    @Autowired
    private DatabaseStructureRepository databaseStructureRepository;

    public String findStructureByDatabaseConnectionId(final Long databaseConnectionId) {
        return databaseStructureRepository.findByDatabaseConnectionId(databaseConnectionId).getStructure();
    }
}
