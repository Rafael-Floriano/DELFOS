import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const ConnectionLabel = ({ dbName = "Postgres", iconSrc = "/icons/postgres-logo.svg" }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Button
      fullWidth
      variant={selected ? "contained" : "outlined"}
      color={selected ? "primary" : "inherit"}
      onClick={handleClick}
      sx={{
        borderRadius: 0,
        justifyContent: "flex-start",
        gap: 1.5,
        textTransform: "none"
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
