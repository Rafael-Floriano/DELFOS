import React from 'react';
import './App.css';
import SpeechToText from './SpeechToText';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SpeechToText />
      </header>
    </div>
  );
};

export default App;
