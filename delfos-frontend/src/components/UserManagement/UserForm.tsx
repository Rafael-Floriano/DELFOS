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
} from '@mui/material';
import { Permission, PermissionGroup, User } from '../../types/UserManagement';

interface UserFormProps {
  user: User | null;
  groups: PermissionGroup[];
  permissions: Permission[];
  onChange: (user: Partial<User>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, groups, permissions, onChange }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    groups: [],
    permissions: [],
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (field: keyof User, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const handleGroupChange = (groupId: string) => {
    const newGroups = formData.groups?.includes(groupId)
      ? formData.groups.filter(id => id !== groupId)
      : [...(formData.groups || []), groupId];
    
    handleChange('groups', newGroups);
  };

  const handlePermissionChange = (permissionId: string) => {
    const newPermissions = formData.permissions?.includes(permissionId)
      ? formData.permissions.filter(id => id !== permissionId)
      : [...(formData.permissions || []), permissionId];
    
    handleChange('permissions', newPermissions);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Nome"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Grupos
      </Typography>
      <Box sx={{ mb: 3 }}>
        {groups.map((group) => (
          <Chip
            key={group.id}
            label={group.name}
            onClick={() => handleGroupChange(group.id)}
            color={formData.groups?.includes(group.id) ? 'primary' : 'default'}
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
                checked={formData.permissions?.includes(permission.id)}
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
    </Box>
  );
};

export default UserForm; 