import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setIsLoading(true);
    try {
      await register(formData.username, formData.password);
    } catch (err) {
      setError('Erro ao cadastrar. Tente outro nome de usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        backgroundColor: '#1e1e1e',
      }}
    >
      {/* Lado esquerdo - Nome do projeto */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#9c27b0',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.9) 0%, rgba(103, 58, 183, 0.9) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '16px',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              // fontFamily: '"Abril Fatface", cursive',
              letterSpacing: '1px',
            }}
          >
            DELFOS
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Crie sua conta e comece a explorar
          </Typography>
        </Box>
      </Box>

      {/* Lado direito - Formulário de cadastro */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: '500px',
            padding: '60px',
            backgroundColor: '#252525',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              Cadastro
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
              }}
            >
              <TextField
                fullWidth
                label="Usuário"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    fontSize: '1.1rem',
                    height: '56px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '1.1rem',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            color: 'white',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    fontSize: '1.1rem',
                    height: '56px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '1.1rem',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Repetir Senha"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            color: 'white',
                          },
                        }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    fontSize: '1.1rem',
                    height: '56px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '1.1rem',
                  },
                }}
              />

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
                Cadastrar
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
                  Já tem uma conta?
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate('/login')}
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
                  Fazer Login
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register; 