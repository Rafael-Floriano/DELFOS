import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
} from '@mui/material';
import { Permission, PermissionGroup, User } from '../../types/UserManagement';
import SecurityIcon from '@mui/icons-material/Security';
import { useTheme } from '@mui/material/styles';

interface UserFormProps {
  user: User | null;
  groups: PermissionGroup[];
  permissions: Permission[];
  onChange: (user: { username: string; password?: string; permissionGroupIds: number[] }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, groups, permissions, onChange }) => {
  const [formData, setFormData] = useState<{
    username: string;
    password?: string;
    permissionGroupIds: number[];
  }>({
    username: '',
    permissionGroupIds: [],
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        permissionGroupIds: user.permissionGroups.map(g => g.id)
      });
      setConfirmPassword('');
    }
  }, [user]);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const handleGroupChange = (groupId: number) => {
    const newGroupIds = formData.permissionGroupIds.includes(groupId)
      ? formData.permissionGroupIds.filter(id => id !== groupId)
      : [...formData.permissionGroupIds, groupId];
    handleChange('permissionGroupIds', newGroupIds);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, password: e.target.value }));
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
            value={formData.password || ''}
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
            color={formData.permissionGroupIds.includes(group.id) ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      {user && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Permissões
          </Typography>
          <Box>
            {(user.allPermissions || []).map((permission: Permission) => (
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
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserForm; 