import React from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DatabaseConnectionLabel } from '../../services/types/DatabaseConnectionLabel';

interface DatabaseConnectionCardProps {
  connection: DatabaseConnectionLabel;
  selected: boolean;
  onSelect: (dbName: string) => void;
  onEdit: (dbName: string) => void;
  onDelete: () => void;
}

const DatabaseConnectionCard: React.FC<DatabaseConnectionCardProps> = ({
  connection,
  selected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(connection.label);
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Card
      sx={{
        m: 1,
        cursor: 'pointer',
        backgroundColor: selected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
        '&:hover': {
          backgroundColor: selected ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)',
        },
        position: 'relative',
        border: selected ? '1px solid rgba(25, 118, 210, 0.5)' : '1px solid transparent',
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={() => onSelect(connection.label)}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box
          component="img"
          src={connection.iconSrc || "/icons/database/postgresql-logo-svgrepo-com.svg"}
          alt={connection.label}
          sx={{ width: 32, height: 32, mr: 2 }}
        />
        <Typography 
          variant="subtitle1" 
          sx={{ 
            flexGrow: 1,
            color: selected ? 'primary.main' : 'text.primary',
            fontWeight: selected ? 600 : 400,
          }}
        >
          {connection.label}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
          sx={{
            color: selected ? 'primary.main' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>Editar conexão</MenuItem>
        <MenuItem onClick={handleDelete}>Excluir conexão</MenuItem>
      </Menu>
    </Card>
  );
};

export default DatabaseConnectionCard; 