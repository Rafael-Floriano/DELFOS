import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
};

export default App;
