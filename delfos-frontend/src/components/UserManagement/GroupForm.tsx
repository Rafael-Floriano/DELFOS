import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Permission, PermissionGroup, PermissionType } from '../../types/UserManagement';

interface GroupFormProps {
  group: PermissionGroup | null;
  permissions: Permission[];
  onChange: (group: Partial<PermissionGroup>) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ group, permissions, onChange }) => {
  const [formData, setFormData] = useState<Partial<PermissionGroup>>({
    name: '',
    description: '',
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

  const handlePermissionChange = (permissionId: number) => {
    const newPermissions = formData.permissions?.some(p => p.id === permissionId)
      ? formData.permissions.filter(p => p.id !== permissionId)
      : [...(formData.permissions || []), { id: permissionId }];
    
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
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descrição"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          multiline
          rows={2}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Permissões do Grupo
      </Typography>
      <FormGroup>
        {permissions.map((permission) => (
          <Box key={permission.id} sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.permissions?.some(p => p.id === permission.id)}
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
            {formData.permissions?.some(p => p.id === permission.id) && (
              <FormControl fullWidth sx={{ mt: 1, ml: 4 }}>
                <InputLabel>Tipo de Permissão</InputLabel>
                <Select
                  value={formData.permissions.find(p => p.id === permission.id)?.type || PermissionType.READ}
                  onChange={(e) => {
                    const updatedPermissions = formData.permissions?.map(p => 
                      p.id === permission.id 
                        ? { ...p, type: e.target.value as PermissionType }
                        : p
                    );
                    handleChange('permissions', updatedPermissions);
                  }}
                  label="Tipo de Permissão"
                >
                  {Object.values(PermissionType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};

export default GroupForm; 