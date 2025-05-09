import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* ... existing code ... */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#9c27b0',
          color: 'white',
          padding: '16px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          height: '56px',
          '&:hover': {
            backgroundColor: '#7b1fa2',
          },
        }}
      >
        Entrar
      </Button>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '8px',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
          }}
        >
          Não tem uma conta?
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate('/register')}
          sx={{
            color: '#9c27b0',
            fontSize: '1rem',
            fontWeight: 'bold',
            padding: '4px 8px',
            '&:hover': {
              backgroundColor: 'rgba(156, 39, 176, 0.1)',
            },
          }}
        >
          Cadastre-se
        </Button>
      </Box>

      {/* ... existing code ... */}
    </div>
  );
};

export default Login; 