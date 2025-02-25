package senac.plugin;

import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import senac.plugin.utils.VenvDirectoryManager;

@Mojo(name = "listen", defaultPhase = LifecyclePhase.PROCESS_SOURCES)
public class MojoListen {

    public static void main(String[] args) {

        final VenvDirectoryManager venvDirectoryManager = new VenvDirectoryManager();
        venvDirectoryManager.createVenvDirectoryIfNotExists();

    }

}
