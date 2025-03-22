import React from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import Workbench from '../components/Workbench/Workbench';

const App: React.FC = () => {


  return (
      <div>
        <Sidebar />
        <Workbench />
      </div>
  );
};

export default App;
