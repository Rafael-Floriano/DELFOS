import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
  TableCell,
} from '@mui/material';
import { Permission, PermissionGroup, User } from '../../types/UserManagement';
import SecurityIcon from '@mui/icons-material/Security';
import { useTheme } from '@mui/material/styles';

interface UserFormProps {
  user: User | null;
  groups: PermissionGroup[];
  permissions: Permission[];
  onChange: (user: Partial<User>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, groups, permissions, onChange }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    groups: [],
    permissions: [],
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(user);
      setPassword('');
      setConfirmPassword('');
    }
  }, [user]);

  const handleChange = (field: keyof User, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const handleGroupChange = (groupId: number) => {
    const newGroups = formData.groups?.some((g: PermissionGroup) => g.id === groupId)
      ? (formData.groups || []).filter((g: PermissionGroup) => g.id !== groupId)
      : [...(formData.groups || []), groups.find(g => g.id === groupId)!];
    handleChange('groups', newGroups);
  };

  const handlePermissionChange = (permissionId: number) => {
    const newPermissions = formData.permissions?.some((p: Permission) => p.id === permissionId)
      ? (formData.permissions || []).filter((p: Permission) => p.id !== permissionId)
      : [...(formData.permissions || []), permissions.find(p => p.id === permissionId)!];
    handleChange('permissions', newPermissions);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onChange({ ...formData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Nome de Usuário"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
      </Box>

      {user == null && (
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirmar Senha"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Box>
      )}

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Grupos
      </Typography>
      <Box sx={{ mb: 3 }}>
        {groups.map((group) => (
          <Chip
            key={group.id}
            label={group.name}
            onClick={() => handleGroupChange(group.id)}
            color={formData.groups?.some((g: PermissionGroup) => g.id === group.id) ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Permissões
      </Typography>
      <FormGroup>
        {permissions.map((permission) => (
          <FormControlLabel
            key={permission.id}
            control={
              <Checkbox
                checked={formData.permissions?.some((p: Permission) => p.id === permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              />
            }
            label={
              <Box>
                <Typography variant="body1">{permission.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {permission.description}
                </Typography>
              </Box>
            }
          />
        ))}
      </FormGroup>

      <TableCell>
        {(user?.allPermissions || []).map((permission: Permission) => (
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
    </Box>
  );
};

export default UserForm; 