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
import { Permission, PermissionGroup, User } from '../types/UserManagement';

const defaultPermissions: Permission[] = [
  {
    id: 'manage_connections',
    name: 'Gerenciar Conexões',
    description: 'Permite criar, editar e excluir conexões de banco de dados',
  },
  {
    id: 'manage_users',
    name: 'Gerenciar Usuários',
    description: 'Permite criar, editar e excluir usuários',
  },
  {
    id: 'view_users',
    name: 'Ver Usuários',
    description: 'Permite visualizar outros usuários',
  },
  {
    id: 'use_connections',
    name: 'Usar Conexões',
    description: 'Permite visualizar e usar conexões de banco de dados',
  },
];

const UserManagement: React.FC = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null);
  const [userFormData, setUserFormData] = useState<Partial<User>>({});
  const [groupFormData, setGroupFormData] = useState<Partial<PermissionGroup>>({});

  // Mock data - substituir por chamadas à API
  useEffect(() => {
    setUsers([
      {
        id: '1',
        name: 'Admin',
        groups: ['admin'],
        permissions: ['manage_connections', 'manage_users', 'view_users', 'use_connections'],
      },
      {
        id: '2',
        name: 'Usuário',
        groups: ['user'],
        permissions: ['use_connections'],
      },
    ]);

    setGroups([
      {
        id: 'admin',
        name: 'Administrador',
        permissions: ['manage_connections', 'manage_users', 'view_users', 'use_connections'],
      },
      {
        id: 'user',
        name: 'Usuário',
        permissions: ['use_connections'],
      },
    ]);
  }, []);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setUserFormData({});
    setOpenUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserFormData(user);
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

  const handleSaveUser = () => {
    if (selectedUser) {
      // Atualizar usuário existente
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...userFormData } : user
      ));
    } else {
      // Criar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: userFormData.name || '',
        groups: userFormData.groups || [],
        permissions: userFormData.permissions || [],
      };
      setUsers([...users, newUser]);
    }
    setOpenUserDialog(false);
  };

  const handleSaveGroup = () => {
    if (selectedGroup) {
      // Atualizar grupo existente
      setGroups(groups.map(group => 
        group.id === selectedGroup.id ? { ...group, ...groupFormData } : group
      ));
    } else {
      // Criar novo grupo
      const newGroup: PermissionGroup = {
        id: Date.now().toString(),
        name: groupFormData.name || '',
        permissions: groupFormData.permissions || [],
      };
      setGroups([...groups, newGroup]);
    }
    setOpenGroupDialog(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
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
                          <Typography>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {user.groups.map((groupId) => {
                          const group = groups.find(g => g.id === groupId);
                          return group ? (
                            <Chip
                              key={groupId}
                              label={group.name}
                              size="small"
                              sx={{ 
                                mr: 1, 
                                mb: 1,
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.contrastText,
                              }}
                            />
                          ) : null;
                        })}
                      </TableCell>
                      <TableCell>
                        {user.permissions.map((permissionId) => {
                          const permission = defaultPermissions.find(p => p.id === permissionId);
                          return permission ? (
                            <Chip
                              key={permissionId}
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
                          ) : null;
                        })}
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
    </Box>
  );
};

export default UserManagement; 