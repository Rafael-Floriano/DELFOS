import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface QueryResultsProps {
  data: any[];
  columns: string[];
  isLoading?: boolean;
  error?: string;
}

const QueryResults: React.FC<QueryResultsProps> = ({
  data,
  columns,
  isLoading = false,
  error,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ p: 2, color: 'white' }}>
        <Typography>Carregando resultados...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
          gap: 2,
          color: 'white',
          backgroundColor: '#1e1e1e',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(45, 45, 45, 0.5)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Nenhum resultado encontrado
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1.5,
              borderRadius: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Typography variant="body1" sx={{ color: '#90caf9' }}>
              Pressione
            </Typography>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                V
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#90caf9' }}>
              para falar com o agente
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2,
        height: 'calc(100vh - 100px)',
        width: '100%',
        backgroundColor: '#1e1e1e',
        color: 'white',
        '& .MuiTableCell-root': {
          borderColor: '#333',
          color: 'white',
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  backgroundColor: '#2d2d2d',
                  fontWeight: 'bold',
                  borderBottom: '2px solid #333',
                  color: 'white',
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: '#1e1e1e',
                },
                '&:nth-of-type(even)': {
                  backgroundColor: '#252525',
                },
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QueryResults; 