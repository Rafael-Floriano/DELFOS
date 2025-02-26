package senac.plugin.services;

import senac.plugin.utils.VenvDirectoryManager;

public class SetupService {

    private final VenvDirectoryManager venvDirectoryManager = new VenvDirectoryManager();

    public void createSetupIfNotExists() {
        venvDirectoryManager.createVenvDirectoryIfNotExists();
        // Instalar dependencias necessárias
    }

}
