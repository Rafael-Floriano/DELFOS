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

      {/* ... existing code ... */}
    </div>
  );
};

export default Login; 