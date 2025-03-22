import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechToText: React.FC = ({ onStart, onStop }: { onStart: () => void, onStop: () => void }) => {
  const [isRecording, setIsRecording] = useState(false);
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
        const resultText = lastResult[0].transcript;
        setTranscription(resultText);
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
      onStop();
      recognition.stop();
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: isRecording ? 'red' : 'green',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <IconButton onClick={isRecording ? stopRecording : startRecording} sx={{ color: '#fff' }}>
          {isRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>
        {isRecording && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: 8,
              fontSize: '12px',
              color: '#fff',
            }}
          >
            {timer}s
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SpeechToText;