import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import httpClient from './services/client/DelfosClient';
import QueryResults from './components/QueryResults/QueryResults';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechToText: React.FC<{ onStart: () => void, onStop: () => void }> = ({ onStart, onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      if (event.key.toLowerCase() === 'v') {
        isRecording ? stopRecording() : startRecording();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRecording]);

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
          setColumns(Object.keys(results[0]));
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
        sendTranscriptionToBackend(transcription);
      }

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
            top: '10px',
            right: '20px',
            backgroundColor: 'red',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
          }}
        >
          🎤 Gravando... ({timer}s)
        </Box>
      )}

      {!isRecording && (
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <QueryResults
            data={queryResults}
            columns={columns}
            isLoading={isLoading}
            error={errorMessage}
          />
        </Box>
      )}

    </Box>
  );
};

export default SpeechToText;
