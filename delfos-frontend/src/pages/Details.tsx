import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Details: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#1e1e1e',
        padding: '40px',
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: '"Abril Fatface", cursive',
            }}
          >
            DELFOS
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              color: '#9c27b0',
              borderColor: '#9c27b0',
              '&:hover': {
                borderColor: '#7b1fa2',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
              },
            }}
          >
            Voltar ao Login
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: '30px',
                backgroundColor: '#252525',
                borderRadius: '16px',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                Sobre o Projeto
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                }}
              >
                O Delfos é uma plataforma inovadora que transforma a maneira como interagimos com dados.
                Utilizando tecnologia de ponta em processamento de linguagem natural, permitimos que
                usuários façam consultas complexas em linguagem natural, tornando a análise de dados
                mais acessível e intuitiva.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: '30px',
                backgroundColor: '#252525',
                borderRadius: '16px',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                Recursos Principais
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  • Consultas em linguagem natural
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  • Processamento de voz integrado
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  • Visualização de dados em tempo real
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  • Interface intuitiva e moderna
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                padding: '30px',
                backgroundColor: '#252525',
                borderRadius: '16px',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  marginBottom: '20px',
                  fontWeight: 'bold',
                }}
              >
                Como Começar
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}
              >
                Para começar a usar o Delfos, basta criar uma conta e fazer login. Nossa plataforma
                foi projetada para ser intuitiva e fácil de usar, permitindo que você comece a
                explorar seus dados imediatamente.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  backgroundColor: '#9c27b0',
                  color: 'white',
                  padding: '12px 24px',
                  '&:hover': {
                    backgroundColor: '#7b1fa2',
                  },
                }}
              >
                Criar Conta
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Details; 