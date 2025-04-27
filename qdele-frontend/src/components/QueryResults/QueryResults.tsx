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
      <Box sx={{ p: 2, color: 'white' }}>
        <Typography>Nenhum resultado encontrado.</Typography>
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