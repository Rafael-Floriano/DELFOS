import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { ConnectionData, DatabaseType } from '../../../types/ConnectionModal';
import { createConnection, updateConnection } from "../../../services/DatabaseConnectionService";

interface ConnectionModalProps {
  open: boolean;
  onClose: (success: boolean) => void;
  onSave: (data: ConnectionData) => void;
  initialData: any | null;
  edit: boolean;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  edit,
}) => {
  const [formData, setFormData] = useState<ConnectionData>({
    name: '',
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
    type: 'PostgreSQL',
  });

  useEffect(() => {
    console.log('ConnectionModal - initialData:', initialData);
    console.log('ConnectionModal - edit:', edit);
    
    if (initialData && edit) {
      // Mapear os dados da API para o formato do formulário
      const mappedData = {
        id: initialData.id,
        name: initialData.name || '',
        host: initialData.url || '',
        port: initialData.port?.toString() || '',
        database: initialData.databaseUrlCompletedUrl?.split(':')[1] || '',
        user: initialData.username || '',
        password: initialData.password || '',
        type: initialData.databaseType 
          ? initialData.databaseType.charAt(0) + initialData.databaseType.slice(1).toLowerCase()
          : 'PostgreSQL',
      };
      
      console.log('ConnectionModal - mappedData:', mappedData);
      setFormData(mappedData);
    } else {
      // Limpar o formulário quando não estiver editando
      setFormData({
        name: '',
        host: '',
        port: '',
        database: '',
        user: '',
        password: '',
        type: 'PostgreSQL',
      });
    }
  }, [initialData, edit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        url: formData.host,
        port: parseInt(formData.port),
        username: formData.user,
        password: formData.password,
        databaseType: formData.type.toUpperCase(),
      };

      if (edit && formData.id) {
        await updateConnection(parseInt(formData.id), payload);
      } else {
        await createConnection(payload);
      }

      onSave(formData);
      onClose(true);
    } catch (error) {
      console.error("Erro ao salvar conexão:", error);
      onSave(formData);
      onClose(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{edit ? 'Editar Conexão' : 'Nova Conexão'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nome da Conexão"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="type"
                select
                label="Tipo de Banco"
                fullWidth
                value={formData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                <MenuItem value="MariaDB">MariaDB</MenuItem>
                <MenuItem value="Firebird">Firebird</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="host"
                label="Host"
                fullWidth
                value={formData.host}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="port"
                label="Porta"
                fullWidth
                value={formData.port}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="database"
                label="Nome do Banco"
                fullWidth
                value={formData.database}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="user"
                label="Usuário"
                fullWidth
                value={formData.user}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Senha"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            {edit ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ConnectionModal;
