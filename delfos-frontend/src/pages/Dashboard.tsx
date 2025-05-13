import React, { useState } from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import Workbench from '../components/Workbench/Workbench';
import Navbar from '../components/Navbar/Navbar';
import { Box } from '@mui/material';

const Dashboard: React.FC = () => {
    const [drawerWidth, setDrawerWidth] = useState(240);
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar drawerWidth={drawerWidth} setDrawerWidth={setDrawerWidth} />
          <Workbench sidebarWidth={drawerWidth} />
        </Box>
      </Box>
    );
  };

export default Dashboard;
