import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const App: React.FC = () => {
  // TODO: Implementar verificação de autenticação
  const isAuthenticated = true; // Temporariamente true para permitir acesso ao dashboard

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
        main: '#9c27b0', // Roxo mais vibrante
      },
      text: {
        primary: '#e0e0e0',  // Cor do texto principal
        secondary: '#b0b0b0',  // Cor do texto secundário
      },
    },
    typography: {
      fontFamily: '"Afacad", sans-serif',
      h1: {
        fontFamily: '"Afacad", sans-serif',
      },
      h2: {
        fontFamily: '"Afacad", sans-serif',
      },
      h3: {
        fontFamily: '"Afacad", sans-serif',
      },
      h4: {
        fontFamily: '"Afacad", sans-serif',
      },
      h5: {
        fontFamily: '"Afacad", sans-serif',
      },
      h6: {
        fontFamily: '"Afacad", sans-serif',
      },
      body1: {
        fontFamily: '"Afacad", sans-serif',
      },
      body2: {
        fontFamily: '"Afacad", sans-serif',
      },
      button: {
        fontFamily: '"Afacad", sans-serif',
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
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<Details />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>  
  );
};

export default App;
