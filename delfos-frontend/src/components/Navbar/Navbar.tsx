import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: 1201,
}));

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          DELFOS
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Usuário</Button>
          <Button 
            color="inherit" 
            onClick={logout}
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