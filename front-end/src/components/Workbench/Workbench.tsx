import { Box } from "@mui/material";
import SpeechToText from "../../SpeechToText";

const Workbench: React.FC = () => {
    const handleStart = () => {
      console.log('Iniciando gravação...');
    };
  
    const handleStop = () => {
      console.log('Gravação parada.');
    };
  
    return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
          }}
        >
          <Box sx={{ padding: 3 }}>
            <SpeechToText onStart={handleStart} onStop={handleStop} />
          </Box>
        </Box>
      );
  };
  
  export default Workbench;