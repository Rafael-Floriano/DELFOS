import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import UserForm from '../components/UserManagement/UserForm';
import GroupForm from '../components/UserManagement/GroupForm';
import { Permission, PermissionGroup, User, PermissionType } from '../types/UserManagement';
import * as userManagementService from '../services/userManagementService';

const defaultPermissions: Permission[] = [
  {
    id: 1,
    name: 'Gerenciar Conexões',
    description: 'Permite criar, editar e excluir conexões de banco de dados',
    type: PermissionType.ADMIN
  },
  {
    id: 2,
    name: 'Gerenciar Usuários',
    description: 'Permite criar, editar e excluir usuários',
    type: PermissionType.ADMIN
  },
  {
    id: 3,
    name: 'Ver Usuários',
    description: 'Permite visualizar outros usuários',
    type: PermissionType.READ
  },
  {
    id: 4,
    name: 'Usar Conexões',
    description: 'Permite visualizar e usar conexões de banco de dados',
    type: PermissionType.READ
  },
];

const UserManagement: React.FC = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null);
  const [userFormData, setUserFormData] = useState<{
    username: string;
    password?: string;
    permissionGroupIds: number[];
  }>({
    username: '',
    permissionGroupIds: []
  });
  const [groupFormData, setGroupFormData] = useState<Partial<PermissionGroup>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando carregamento dos dados...');
      
      const [usersData, groupsData, permissionsData] = await Promise.all([
        userManagementService.getUsers(),
        userManagementService.getPermissionGroups(),
        userManagementService.getPermissions(),
      ]);
      
      console.log('Dados carregados:', { usersData, groupsData, permissionsData });
      
      setUsers(usersData);
      setGroups(groupsData);
      setPermissions(permissionsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados. Por favor, tente novamente.');
      showSnackbar('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setUserFormData({ username: '', permissionGroupIds: [] });
    setOpenUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserFormData({
      username: user.username,
      permissionGroupIds: user.permissionGroups?.map(group => group.id) || []
    });
    setOpenUserDialog(true);
  };

  const handleCreateGroup = () => {
    setSelectedGroup(null);
    setGroupFormData({});
    setOpenGroupDialog(true);
  };

  const handleEditGroup = (group: PermissionGroup) => {
    setSelectedGroup(group);
    setGroupFormData(group);
    setOpenGroupDialog(true);
  };

  const handleSaveUser = async () => {
    try {
      if (selectedUser) {
        const updatedUser = await userManagementService.updateUser(selectedUser.id, userFormData);
        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
        showSnackbar('Usuário atualizado com sucesso', 'success');
      } else {
        if (!userFormData.password) {
          showSnackbar('Senha é obrigatória para novo usuário', 'error');
          return;
        }
        const newUser = await userManagementService.createUser({
          username: userFormData.username,
          password: userFormData.password,
          permissionGroupIds: userFormData.permissionGroupIds
        });
        setUsers([...users, newUser]);
        showSnackbar('Usuário criado com sucesso', 'success');
      }
      setOpenUserDialog(false);
    } catch (error) {
      showSnackbar('Erro ao salvar usuário', 'error');
    }
  };

  const handleSaveGroup = async () => {
    try {
      if (selectedGroup) {
        const updatedGroup = await userManagementService.updatePermissionGroup(selectedGroup.id, groupFormData);
        setGroups(groups.map(group => group.id === selectedGroup.id ? updatedGroup : group));
        showSnackbar('Grupo atualizado com sucesso', 'success');
      } else {
        const newGroup = await userManagementService.createPermissionGroup(groupFormData as Omit<PermissionGroup, 'id'>);
        setGroups([...groups, newGroup]);
        showSnackbar('Grupo criado com sucesso', 'success');
      }
      setOpenGroupDialog(false);
    } catch (error) {
      showSnackbar('Erro ao salvar grupo', 'error');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await userManagementService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      showSnackbar('Usuário excluído com sucesso', 'success');
    } catch (error) {
      showSnackbar('Erro ao excluir usuário', 'error');
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      await userManagementService.deletePermissionGroup(groupId);
      setGroups(groups.filter(group => group.id !== groupId));
      showSnackbar('Grupo excluído com sucesso', 'success');
    } catch (error) {
      showSnackbar('Erro ao excluir grupo', 'error');
    }
  };

  const filteredUsers = users.filter(user =>
    (user.username || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography color="error" variant="h6">{error}</Typography>
        <Button 
          variant="contained" 
          onClick={loadData}
          sx={{ mt: 2 }}
        >
          Tentar Novamente
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto', backgroundColor: theme.palette.background.default }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            backgroundColor: theme.palette.background.paper,
            p: 3,
            borderRadius: 1,
            boxShadow: theme.shadows[1],
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                  Gerenciamento de Usuários
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Gerencie usuários, grupos e permissões do sistema
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<GroupIcon />}
                onClick={handleCreateGroup}
                sx={{
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    borderColor: theme.palette.secondary.dark,
                    backgroundColor: 'rgba(156,39,176,0.08)',
                  },
                }}
              >
                Novo Grupo
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateUser}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Novo Usuário
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ 
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            boxShadow: theme.shadows[1],
            overflow: 'hidden',
          }}>
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Pesquisar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Grupos</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Permissões</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow 
                      key={user.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PeopleIcon sx={{ color: theme.palette.primary.main }} />
                          <Typography>{user.username}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {(user.permissionGroups || []).map((group) => (
                          <Chip
                            key={group.id}
                            label={group.name}
                            size="small"
                            sx={{ 
                              mr: 1, 
                              mb: 1,
                              backgroundColor: theme.palette.secondary.main,
                              color: theme.palette.secondary.contrastText,
                            }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        {(user.allPermissions || []).map((permission) => (
                          <Chip
                            key={permission.id}
                            label={permission.name}
                            size="small"
                            variant="outlined"
                            icon={<SecurityIcon />}
                            sx={{ 
                              mr: 1, 
                              mb: 1,
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                            }}
                          />
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          onClick={() => handleEditUser(user)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: 'rgba(144, 202, 249, 0.08)',
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                          sx={{ 
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.08)',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog para criar/editar usuário */}
      <Dialog 
        open={openUserDialog} 
        onClose={() => setOpenUserDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6">
              {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <UserForm
            user={selectedUser}
            groups={groups}
            permissions={defaultPermissions}
            onChange={(data) => setUserFormData(data)}
          />
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: `1px solid ${theme.palette.divider}`,
          pt: 2,
          px: 3,
        }}>
          <Button 
            onClick={() => setOpenUserDialog(false)}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveUser}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para criar/editar grupo */}
      <Dialog 
        open={openGroupDialog} 
        onClose={() => setOpenGroupDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GroupIcon sx={{ color: theme.palette.secondary.main }} />
            <Typography variant="h6">
              {selectedGroup ? 'Editar Grupo' : 'Novo Grupo'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <GroupForm
            group={selectedGroup}
            permissions={defaultPermissions}
            onChange={(data) => setGroupFormData(data)}
          />
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: `1px solid ${theme.palette.divider}`,
          pt: 2,
          px: 3,
        }}>
          <Button 
            onClick={() => setOpenGroupDialog(false)}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleSaveGroup}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement; 