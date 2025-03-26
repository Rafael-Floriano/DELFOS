import React from 'react';
import { Button, Box } from '@mui/material';

interface ConnectionLabelProps {
  dbName: string;
  iconSrc: string;
  selected: boolean;
  onSelect: (dbName: string) => void;
  onRightClick: () => void;
}

const ConnectionLabel: React.FC<ConnectionLabelProps> = ({ dbName, iconSrc, selected, onSelect, onRightClick }) => {
  const handleClick = () => {
    onSelect(dbName);
  };

  const handleRightClick = (event:any) => {
    if (event.button === 2) {
      onRightClick();
    } else {
      onSelect(dbName);
    }
  }

  return (
    <Button
      fullWidth
      color={selected ? "primary" : "inherit"}
      onContextMenu={handleRightClick}
      onClick={handleClick}
      sx={{
        borderRadius: 0,
        justifyContent: "flex-start",
        gap: 1.5,
        textTransform: "none",
        backgroundColor: selected ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
      }}
    >
      <Box
        component="img"
        src={iconSrc}
        alt={dbName}
        sx={{ width: 24, height: 24 }}
      />
      {dbName}
    </Button>
  );
};

export default ConnectionLabel;
