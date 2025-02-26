package senac.plugin;

import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import senac.plugin.services.SetupService;

@Mojo(name = "listen", defaultPhase = LifecyclePhase.PROCESS_SOURCES)
public class MojoListen {

    public static void main(String[] args) {
        final SetupService setupService = new SetupService();
        setupService.createSetupIfNotExists();
    }

}
