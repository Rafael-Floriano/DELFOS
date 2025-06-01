import { Box } from "@mui/material";
import SpeechToText from "../../SpeechToText";
import { DatabaseConnectionLabel } from "../../services/types/DatabaseConnectionLabel";
import { useState } from "react";

interface WorkbenchProps {
  sidebarWidth: number;
  selectedConnection: DatabaseConnectionLabel | null;
}

const Workbench: React.FC<WorkbenchProps> = ({ sidebarWidth, selectedConnection }) => {
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
        <SpeechToText 
          onStart={handleStart} 
          onStop={handleStop} 
          selectedConnection={selectedConnection}
        />
      </Box>
    </Box>
  );
};

export default Workbench;
