import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameOptions = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lobbyCode, setLobbyCode] = useState('');
  
  // Inicializa a conexão do socket
  useEffect(() => {
    // Substitua pela URL do seu servidor
    const newSocket = io('http://localhost:3000', {
      auth: {
        userId: 1, // Você deve pegar isso do seu sistema de autenticação
        username: "StopMan"
      }
    });

    newSocket.on('connect', () => {
      console.log('Conectado ao servidor');
    });

    newSocket.on('connect_error', (err) => {
      setError('Erro de conexão com o servidor');
      console.error('Erro de conexão:', err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Listener para respostas do servidor
  useEffect(() => {
    if (!socket) return;

    socket.on('enter_lobby_response', (response) => {
      setIsLoading(false);
      
      if (!response.status) {
        setError(response.msg);
        return;
      }

      // Navega para a próxima tela com os dados do lobby
      navigate('/draw-letter', { 
        state: { 
          totalRounds: response.rounds,
          time: response.time,
          maxMembers: response.max_members,
          numberMembers: response.number_members,
          themes: response.themes,
          lobbyCode: lobbyCode
        } 
      });
    });

    return () => {
      socket.off('enter_lobby_response');
    };
  }, [socket, navigate, lobbyCode]);

  const handleJoinLobby = () => {
    if (!lobbyCode) {
      setError('Por favor, insira o código do lobby');
      return;
    }

    setIsLoading(true);
    setError('');
    
    socket.emit('enter_lobby', {
      code_lobby: lobbyCode,
      id_user: 1 // Você deve pegar isso do seu sistema de autenticação
    });
  };

  return (
    <Box className="flex justify-center items-center h-screen" style={{ backgroundColor: '#f74440' }}>
      <Box 
        className="w-96 p-6 relative"
        style={{
          backgroundColor: '#ffc94d',
          borderRadius: '16px',
          border: '10px solid #f74440',
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
        }}
      >
        <IconButton 
          onClick={() => navigate('/profile')}
          className="absolute top-2 left-2"
          style={{ color: '#f74440' }}
        >
          <ArrowLeft />
        </IconButton>

        <Typography 
          className="text-center font-bold text-xl mb-4"
          style={{ color: '#f74440' }}
        >
          OPÇÕES DE PARTIDA
        </Typography>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <TextField
          value={lobbyCode}
          onChange={(e) => setLobbyCode(e.target.value)}
          placeholder="Digite o código do lobby"
          className="w-full mb-4 p-2 border rounded"
        />

        <Button
          onClick={handleJoinLobby}
          disabled={isLoading}
          className="w-full py-2 rounded font-bold"
          style={{
            backgroundColor: '#f74440',
            color: '#fff'
          }}
        >
          {isLoading ? 'ENTRANDO...' : 'ENTRAR NO LOBBY'}
        </Button>
      </Box>
    </Box>
  );
};

export default GameOptions;