import { useEffect, useState } from "react";
import { ConnectionData, ConnectionModalProps, DatabaseType } from "../../../types/ConnectionModal";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from "@mui/material";

const ConnectionModal: React.FC<ConnectionModalProps> = ({
    open,
    onClose,
    onSave,
    initialData,
  }) => {
    const [formData, setFormData] = useState<ConnectionData>({
      name: "",
      host: "",
      port: "",
      database: "",
      user: "",
      password: "",
      type: "PostgreSQL",
    });
  
    useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      }
    }, [initialData]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, type: e.target.value as DatabaseType }));
    };
  
    const handleSave = () => {
      onSave(formData);
    };

    const handleClose = () => {
      setFormData(
        {
          name: "",
          host: "",
          port: "",
          database: "",
          user: "",
          password: "",
          type: "PostgreSQL",
        }
      )
      onClose(false)
    }
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {initialData ? "Editar Conexão" : "Nova Conexão"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Nome da conexão"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Host"
                name="host"
                fullWidth
                value={formData.host}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Porta"
                name="port"
                fullWidth
                value={formData.port}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Banco de dados"
                name="database"
                fullWidth
                value={formData.database}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tipo do banco"
                name="type"
                select
                fullWidth
                value={formData.type}
                onChange={handleSelectChange}
              >
                <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                <MenuItem value="MariaDB">MariaDB</MenuItem>
                <MenuItem value="Firebird">Firebird</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Usuário"
                name="user"
                fullWidth
                value={formData.user}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Senha"
                name="password"
                fullWidth
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConnectionModal;
  