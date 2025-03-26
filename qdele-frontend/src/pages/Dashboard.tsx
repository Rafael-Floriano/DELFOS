import React, { useState } from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import Workbench from '../components/Workbench/Workbench';

const App: React.FC = () => {
    const [drawerWidth, setDrawerWidth] = useState(240);
  
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar drawerWidth={drawerWidth} setDrawerWidth={setDrawerWidth} />
        <Workbench sidebarWidth={drawerWidth} />
      </div>
    );
  };

export default App;
