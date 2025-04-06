import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

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
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
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

      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <>
      {errorMessage && (
        <Typography color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {/* Indicador discreto no canto direito quando está gravando */}
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
          }}
        >
          🎤 Gravando... ({timer}s)
        </Box>
      )}
    </>
  );
};

export default SpeechToText;
