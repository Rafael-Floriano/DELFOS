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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
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
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Gerenciamento de Usuários
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<GroupIcon />}
                onClick={handleCreateGroup}
              >
                Novo Grupo
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateUser}
              >
                Novo Usuário
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Grupos</TableCell>
                  <TableCell>Permissões</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {user.groups.map((groupId) => {
                        const group = groups.find(g => g.id === groupId);
                        return group ? (
                          <Chip
                            key={groupId}
                            label={group.name}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
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
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ) : null;
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Dialog para criar/editar usuário */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <UserForm
            user={selectedUser}
            groups={groups}
            permissions={defaultPermissions}
            onChange={(data) => setUserFormData(data)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleSaveUser}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para criar/editar grupo */}
      <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedGroup ? 'Editar Grupo' : 'Novo Grupo'}
        </DialogTitle>
        <DialogContent>
          <GroupForm
            group={selectedGroup}
            permissions={defaultPermissions}
            onChange={(data) => setGroupFormData(data)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupDialog(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleSaveGroup}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 