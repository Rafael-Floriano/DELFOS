import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: 1201,
}));

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleUserManagement = () => {
    navigate('/user-management');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          DELFOS
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={handleUserManagement}
            startIcon={<PeopleAltIcon />}
            sx={{
              fontWeight: 600,
              '&:hover': {
                color: theme => theme.palette.primary.main,
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            Gerenciamento de Usuários
          </Button>
          <Button 
            color="inherit" 
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{
              fontWeight: 600,
              '&:hover': {
                color: theme => theme.palette.secondary.main,
                backgroundColor: 'rgba(156,39,176,0.08)',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 