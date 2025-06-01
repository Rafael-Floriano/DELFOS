import React, { useState } from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import Workbench from '../components/Workbench/Workbench';
import Navbar from '../components/Navbar/Navbar';
import { Box } from '@mui/material';
import { DatabaseConnectionLabel } from '../services/types/DatabaseConnectionLabel';

const Dashboard: React.FC = () => {
    const [drawerWidth, setDrawerWidth] = useState(240);
    const [selectedConnection, setSelectedConnection] = useState<DatabaseConnectionLabel | null>(null);
  
    const handleConnectionSelect = (connection: DatabaseConnectionLabel | null) => {
        setSelectedConnection(connection);
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar 
            drawerWidth={drawerWidth} 
            setDrawerWidth={setDrawerWidth} 
            onConnectionSelect={handleConnectionSelect}
          />
          <Workbench 
            sidebarWidth={drawerWidth} 
            selectedConnection={selectedConnection}
          />
        </Box>
      </Box>
    );
  };

export default Dashboard;
