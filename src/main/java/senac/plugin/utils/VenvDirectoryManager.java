package senac.plugin.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class VenvDirectoryManager {

    private final String venvDirectory = "venv";

    public void createVenvDirectoryIfNotExists() {
        Path path = Paths.get(venvDirectory);

        if (!Files.exists(path)) {
            try {
                Files.createDirectory(path);
                System.out.println("Diretório 'venv' criado com sucesso.");

                ProcessBuilder pb = new ProcessBuilder("python", "-m", "venv", path.toString());
                Process process = pb.start();
                int exitCode = process.waitFor();

                if (exitCode == 0) {
                    System.out.println("Ambiente virtual Python criado com sucesso.");
                } else {
                    System.out.println("Falha ao criar o ambiente virtual Python.");
                }
            } catch (IOException | InterruptedException e) {
                System.out.println("Erro ao criar o diretório ou ambiente virtual: " + e.getMessage());
            }
        } else {
            System.out.println("O diretório 'venv' já existe.");
        }
    }

}
