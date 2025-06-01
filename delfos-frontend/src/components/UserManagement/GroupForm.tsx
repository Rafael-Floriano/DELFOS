import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { Permission, PermissionGroup } from '../../types/UserManagement';

interface GroupFormProps {
  group: PermissionGroup | null;
  permissions: Permission[];
  onChange: (group: Partial<PermissionGroup>) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ group, permissions, onChange }) => {
  const [formData, setFormData] = useState<Partial<PermissionGroup>>({
    name: '',
    permissions: [],
  });

  useEffect(() => {
    if (group) {
      setFormData(group);
    }
  }, [group]);

  const handleChange = (field: keyof PermissionGroup, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
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
          label="Nome do Grupo"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Permissões do Grupo
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

export default GroupForm; 