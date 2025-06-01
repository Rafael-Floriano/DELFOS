import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import httpClient from './services/client/DelfosClient';
import QueryResults from './components/QueryResults/QueryResults';
import { DatabaseConnectionLabel } from './services/types/DatabaseConnectionLabel';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const loadingMessages = [
  'Buscando informações...',
  'Consultando banco de dados...',
  'Analisando sua pergunta...',
  'Processando dados...',
  'Aguarde um momento...'
];

const mockSales = [
  {
    numero: '001',
    cliente: 'João Silva',
    total: 'R$ 1.200,00',
    produtos: 'Notebook, Mouse',
  },
  {
    numero: '002',
    cliente: 'Maria Souza',
    total: 'R$ 350,00',
    produtos: 'Teclado, Mousepad',
  },
  {
    numero: '003',
    cliente: 'Carlos Lima',
    total: 'R$ 2.500,00',
    produtos: 'Monitor, Headset, Webcam',
  },
  {
    numero: '004',
    cliente: 'Ana Paula',
    total: 'R$ 800,00',
    produtos: 'Impressora',
  },
];

const SpeechToText: React.FC<{ 
  onStart: () => void, 
  onStop: () => void,
  selectedConnection: DatabaseConnectionLabel | null 
}> = ({ onStart, onStop, selectedConnection }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showTextInputModal, setShowTextInputModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [lastRequest, setLastRequest] = useState<string>('');
  const connectionName = 'conexao-teste'; // mock, pode ser dinâmico depois

  const recognition =
    typeof window.SpeechRecognition !== 'undefined'
      ? new window.SpeechRecognition()
      : typeof window.webkitSpeechRecognition !== 'undefined'
      ? new window.webkitSpeechRecognition()
      : null;

  useEffect(() => {
    if (recognition) {
      recognition.lang = 'pt-BR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        setTranscription(lastResult[0].transcript);
        console.log(lastResult[0].transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Erro ao reconhecer fala:', event.error);
      };
    }
  }, [recognition]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // if (event.key.toLowerCase() === 'v') {
      //   isRecording ? stopRecording() : startRecording();
      // } else
      
      if (event.key.toLowerCase() === 't') {
        setShowTextInputModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRecording]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isProcessing) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
    } else {
      setLoadingMessageIndex(0);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing]);

  const sendTranscriptionToBackend = async (text: string) => {
    try {
      setIsLoading(true);
      const response = await httpClient.post('/prompt?databaseConnectionId=1', text, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      
      if (response.data && response.data.response && Array.isArray(response.data.response)) {
        const results = response.data.response;
        if (results.length > 0) {
          // Get columns from the first result object
          const firstResult = results[0];
          const columns = Object.keys(firstResult);
          setColumns(columns);
          setQueryResults(results);
        } else {
          setQueryResults([]);
          setColumns([]);
        }
      } else {
        setQueryResults([]);
        setColumns([]);
        setErrorMessage('Formato de resposta inválido do servidor.');
      }
      
      console.log('Transcription sent to backend successfully');
    } catch (error) {
      console.error('Error sending transcription to backend:', error);
      setErrorMessage('Erro ao enviar transcrição para o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      onStart();
      recognition.start();
    } else {
      setErrorMessage('A API de reconhecimento de fala não é suportada neste navegador.');
    }
  };

  const stopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      setIsProcessing(true);
      onStop();
      recognition.stop();

      // Send the transcription to the backend
      if (transcription) {
        setLastRequest(transcription);
        sendTranscriptionToBackend(transcription);
      }

      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  function exportToCSV() {
    if (queryResults.length === 0) {
      setErrorMessage('Não há dados para exportar.');
      return;
    }

    const csvRows = [
      columns, // Header row
      ...queryResults.map(row => 
        columns.map(column => {
          const value = row[column];
          // Handle values that might contain commas or quotes
          if (value !== null && value !== undefined) {
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          }
          return '';
        })
      )
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `consulta-${timestamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setIsProcessing(true);
      setLastRequest(textInput);
      sendTranscriptionToBackend(textInput);
      setShowTextInputModal(false);
      setTextInput('');
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#1e1e1e',
      overflow: 'hidden'
    }}>
      {errorMessage && (
        <Typography color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {isRecording && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#ff4444',
              animation: 'pulse 1.2s infinite',
              boxShadow: '0 0 0 0 rgba(255,68,68,0.7)',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(255,68,68,0.7)',
                },
                '50%': {
                  transform: 'scale(1.3)',
                  boxShadow: '0 0 0 12px rgba(255,68,68,0.1)',
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(255,68,68,0.7)',
                },
              },
            }}
          />
          {transcription && (
            <Typography
              sx={{
                color: '#fff',
                marginTop: 2,
                fontSize: '1.2rem',
                textAlign: 'center',
                maxWidth: 400,
                textShadow: '0 2px 8px #000',
                wordBreak: 'break-word',
              }}
            >
              {transcription}
            </Typography>
          )}
        </Box>
      )}

      {isProcessing && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(30,30,30,0.95)',
            borderRadius: 4,
            p: 4,
            minWidth: 320,
            minHeight: 120,
            boxShadow: '0 4px 32px #000a',
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '4px solid #9c27b0',
              borderTop: '4px solid transparent',
              animation: 'spin 1s linear infinite',
              mb: 3,
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
          <Typography
            sx={{
              color: '#fff',
              fontSize: '1.2rem',
              textAlign: 'center',
              mt: 1,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            {loadingMessages[loadingMessageIndex]}
          </Typography>
        </Box>
      )}

      {(!isRecording && !isProcessing) && (
        <Box sx={{
          flex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          p: 0,
          boxSizing: 'border-box',
        }}>
          <Paper elevation={3} sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            background: '#23232b',
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
              borderBottom: '1px solid #333',
              background: '#23232b',
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', letterSpacing: 1 }}>
                Conexão: {selectedConnection ? selectedConnection.label : 'nenhuma conexão selecionada'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ color: '#fff', borderColor: '#9c27b0', '&:hover': { borderColor: '#7b1fa2', background: 'rgba(156,39,176,0.08)' } }}
                  onClick={exportToCSV}
                >
                  Exportar CSV
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: '#9c27b0', color: '#fff', fontWeight: 600, '&:hover': { background: '#7b1fa2' } }}
                  onClick={() => setShowRequestModal(true)}
                >
                  Ver Solicitação
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: '#90caf9', color: '#23232b', fontWeight: 600, '&:hover': { background: '#5fa8d3' } }}
                  onClick={() => setShowTextInputModal(true)}
                >
                  Texto (T)
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: '#90caf9', color: '#23232b', fontWeight: 600, '&:hover': { background: '#5fa8d3' } }}
                  onClick={() => {
                    if (isRecording) {
                      stopRecording();
                    } else {
                      startRecording();
                    }
                  }}
                >
                  Voz (V)
                </Button>
              </Box>
            </Box>
            <TableContainer sx={{ flex: 1, width: '100%', height: '100%', background: 'transparent' }}>
              <Table 
                sx={{ width: '100%', height: '100%', tableLayout: 'fixed' }} 
                aria-label="tabela de resultados"
              >
                <caption style={{
                  captionSide: 'top',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  padding: '16px',
                  background: '#23232b',
                  textAlign: 'left',
                  letterSpacing: 1,
                }}>
                  Resultados da Consulta
                </caption>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell 
                        key={index}
                        sx={{ 
                          color: '#fff', 
                          fontWeight: 'bold', 
                          fontSize: '1.1rem', 
                          borderBottom: '2px solid #444',
                          width: `${100 / columns.length}%`
                        }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queryResults.length > 0 ? (
                    queryResults.map((row, idx) => (
                      <TableRow key={idx} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#282830' } }}>
                        {columns.map((column, colIdx) => (
                          <TableCell 
                            key={colIdx}
                            sx={{ 
                              color: '#fff', 
                              fontSize: '1rem', 
                              borderBottom: '1px solid #333',
                              width: `${100 / columns.length}%`
                            }}
                          >
                            {row[column]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell 
                        colSpan={columns.length} 
                        sx={{ 
                          color: '#fff', 
                          textAlign: 'center', 
                          py: 4,
                          fontSize: '1.1rem'
                        }}
                      >
                        {isLoading ? 'Carregando resultados...' : 'Nenhum resultado encontrado'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Text Input Dialog */}
          <Dialog 
            open={showTextInputModal} 
            onClose={() => setShowTextInputModal(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle sx={{ background: '#23232b', color: '#fff' }}>
              Digite sua consulta
            </DialogTitle>
            <DialogContent sx={{ background: '#23232b', pt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Digite sua consulta aqui..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#444',
                    },
                    '&:hover fieldset': {
                      borderColor: '#666',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                }}
              />
            </DialogContent>
            <DialogActions sx={{ background: '#23232b', px: 3, py: 2 }}>
              <Button 
                onClick={() => setShowTextInputModal(false)}
                sx={{ color: '#fff' }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleTextSubmit}
                variant="contained"
                sx={{ 
                  background: '#9c27b0',
                  color: '#fff',
                  '&:hover': { background: '#7b1fa2' }
                }}
              >
                Enviar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog 
            open={showRequestModal} 
            onClose={() => setShowRequestModal(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle sx={{ background: '#23232b', color: '#fff' }}>
              Solicitação
            </DialogTitle>
            <DialogContent sx={{ background: '#23232b', pt: 2 }}>
              <Typography 
                sx={{ 
                  whiteSpace: 'pre-line',
                  color: '#fff',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}
              >
                {lastRequest || 'Nenhuma solicitação disponível.'}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ background: '#23232b', px: 3, py: 2 }}>
              <Button 
                onClick={() => setShowRequestModal(false)}
                sx={{ color: '#fff' }}
              >
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}

    </Box>
  );
};

export default SpeechToText;
