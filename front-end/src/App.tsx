import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const App: React.FC = () => {

    // Criando um tema escuro
    const theme = createTheme({
      palette: {
        mode: 'dark',  // Definindo o modo para escuro
        background: {
          default: '#121212',  // Cor do fundo da página
          paper: '#1d1d1d',  // Cor do fundo dos componentes, como cards
        },
        primary: {
          main: '#90caf9',  // Cor principal (botões, links, etc.)
        },
        secondary: {
          main: '#f48fb1',  // Cor secundária (secundária, hover, etc.)
        },
        text: {
          primary: '#e0e0e0',  // Cor do texto principal
          secondary: '#b0b0b0',  // Cor do texto secundário
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '4px',  // Ajustando o border-radius dos botões
            },
          },
        },
      },
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />  {/* Reseta o estilo padrão do navegador para aplicar o tema */}
      <div>
        <Dashboard />
      </div>
    </ThemeProvider>  
  );
};

export default App;
