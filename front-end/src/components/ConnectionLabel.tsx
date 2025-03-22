import { Button, Box } from "@mui/material";
import { useState } from "react";

const ConnectionLabel = () => {
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
        justifyContent: "flex-start", // alinha conteúdo à esquerda
        gap: 1.5, // espaço entre ícone e texto
        textTransform: "none" // mantém o texto como "Postgres", sem caixa alta
      }}
    >
      <Box
        component="img"
        src="/icons/postgres-logo.svg" // coloque o caminho certo do seu ícone
        alt="Postgres"
        sx={{ width: 24, height: 24 }}
      />
      Postgres
    </Button>
  );
};

export default ConnectionLabel;
