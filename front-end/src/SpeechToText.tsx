import React, { useState, useEffect } from 'react';

// Declaração global para a API de reconhecimento de fala no navegador
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechToText: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
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
      };

      recognition.onerror = (event: any) => {
        console.error('Erro ao reconhecer fala:', event.error);
        setErrorMessage(`Erro: ${event.error}`);
      };
    }
  }, [recognition]);

  
  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start(); 
    } else {
      setErrorMessage('A API de reconhecimento de fala não é suportada neste navegador.');
    }
  };

  // Função para parar a gravação
  const stopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      recognition.stop(); 
    }
  };

  return (
    <div>
      <h1>Conversor de Áudio para Texto</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? 'Parar' : 'Iniciar'} Gravação
        </button>
      </div>
      <div>
        <h2>Texto Transcrito:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
