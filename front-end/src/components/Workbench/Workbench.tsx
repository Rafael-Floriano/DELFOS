import { Box } from "@mui/material";
import SpeechToText from "../../SpeechToText";

interface WorkbenchProps {
  sidebarWidth: number;
}

const Workbench: React.FC<WorkbenchProps> = ({ sidebarWidth }) => {
  const handleStart = () => {
    console.log('Iniciando gravação...');
  };

  const handleStop = () => {
    console.log('Gravação parada.');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: `calc(100% - ${sidebarWidth}px)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ padding: 3 }}>
        <SpeechToText onStart={handleStart} onStop={handleStop} />
      </Box>
    </Box>
  );
};

export default Workbench;
