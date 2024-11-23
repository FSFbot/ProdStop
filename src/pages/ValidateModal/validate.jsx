import { Modal, Box, Typography, Grid, Button, IconButton } from '@mui/material';
import WebSocket2 from '../../services/WebSocket';
import React, { useState, useEffect } from 'react';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useWebSocket } from '../../services/WebSocketContext';
import './validate.css';

function ValidationModal({ open, close, round }) {
  const { roomCode, handleValidatedResults, handlesocket, socket } = useWebSocket()
  const [gameInfo, setGameInfo] = useState({});
  const [currentTab, setCurrentTab] = useState(0); 
  const [users,setUsers]=useState([])
  const [timer, setTimer] = useState(30); 


  const updateGameInfo = (data) => {
    
    const updatedGameInfo = { 
      ...gameInfo, 
      validate_responses: data 
    };
    setGameInfo(updatedGameInfo); 
    localStorage.setItem('gameInfo', JSON.stringify(updatedGameInfo)); 
  };
  


  useEffect(() => {
    let interval;
    if (open) {

      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval); 
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [open, close]);

  useEffect(() => {
    gameInfo.validate_responses=[]
    const userCache = JSON.parse(localStorage.getItem('gameInfo'));
    setUsers(userCache.users)
   
  }, []);
  // Listener para o evento do WebSocket
  useEffect(() => {
    const initializeSocketListeners = async () => {
      if (socket) {
        await socket.on('validate_responses', (data) => {
          console.log(data); // Verifique os dados recebidos do backend
          updateGameInfo(data);
        });

        // Carregar informações armazenadas no localStorage
        const storedGameInfo = JSON.parse(localStorage.getItem('gameInfo')) || {};
        setGameInfo(storedGameInfo);
      }
    };

    initializeSocketListeners();

    // Limpar os listeners ao desmontar o componente
    return () => {
      if (socket) {
        socket.off('validate_responses');
      }
    };
  }, [socket]);

  // Alternar entre as abas de palavras válidas e inválidas
  const handleTabChange = (direction) => {
    if (direction === 'next') {
      setCurrentTab(1); // Muda para a aba de palavras válidas
    } else if (direction === 'prev') {
      setCurrentTab(0); // Muda para a aba de palavras inválidas
    }
  };

  // Retorna as palavras (válidas ou inválidas) organizadas por tema
  const getWords = () => {
    if (!gameInfo?.validate_responses) return [];

    return currentTab === 0
      ? gameInfo.validate_responses.map((response) => ({
          tema: response.tema,
          palavras: response.palavras_invalidas || [],
        }))
      : gameInfo.validate_responses.map((response) => ({
          tema: response.tema,
          palavras: response.palavras_validas || [],
        }));
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height:800,
          bgcolor: '#201E1D', // Azul escuro
          color: '#fff',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
        }}
      >

        <Typography variant="h2" sx={{ textAlign: 'center', mb: 3, color: '#FFFFFF',borderRadius: '20px',
                    backgroundColor: '#084080',
                    border: '10px solid #201E1D',}}>
          VALIDAÇÃO DA RODADA
        </Typography>


        {/* Timer */}
        <Typography sx={{ textAlign: 'center', color: '#ffc94d', mb: 3, fontSize: '18px' }}>
          Próxima rodada em: <span style={{ fontWeight: 'bold', color: '#ff4d4d' }}>{timer}s</span>
        </Typography>


       
        {/* Navegação entre palavras válidas e inválidas */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <IconButton
            onClick={() => handleTabChange('prev')}
            sx={{ color: '#ffc94d', '&:hover': { color: '#00a86b' } }}
          >
            <ArrowBack />
          </IconButton>

          <Typography sx={{ color: '#ffc94d', fontWeight: 'bold', fontSize: '18px' }}>
            {currentTab === 0
              ? `Palavras Inválidas (${gameInfo?.validate_responses?.reduce(
                  (acc, response) => acc + (response.palavras_invalidas?.length || 0),
                  0
                ) || 0})`
              : `Palavras Válidas (${gameInfo?.validate_responses?.reduce(
                  (acc, response) => acc + (response.palavras_validas?.length || 0),
                  0
                ) || 0})`}
          </Typography>

          <IconButton
            onClick={() => handleTabChange('next')}
            sx={{ color: '#ffc94d', '&:hover': { color: '#00a86b' } }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {/* Exibição das palavras */}
        <Grid container spacing={2}>
          {getWords().map((response, index) => (
            <Grid item xs={12} key={index}>
              <Typography sx={{ fontWeight: 'bold', color: '#ffc94d', mb: 1 }}>
                <span style={{ color: '#00a86b' }}>Tema:</span> {response.tema}
              </Typography>
              {response.palavras.length > 0 ? (
                response.palavras.map((palavra, idx) => (
                  <Typography key={idx} sx={{ color: '#fff', ml: 2 }}>
                    {users?users[idx].username:''}. {palavra}
                  </Typography>
                ))
              ) : (
                <Typography sx={{ color: '#fff', ml: 2 }}>Nenhuma palavra disponível</Typography>
              )}
            </Grid>
          ))}
        </Grid>

        {/* Botão de Voltar */}
       
      </Box>
    </Modal>
  );
}

export default ValidationModal;
