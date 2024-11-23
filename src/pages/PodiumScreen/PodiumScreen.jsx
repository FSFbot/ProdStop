// src/pages/PodiumScreen/PodiumScreen.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PodiumScreen() {
  const navigate = useNavigate();
  const [gameInfo,setGameInfo]=useState({})
  // Simulando dados dos vencedores
  const players = [
    { name: 'Jogador 1', points: 100, position: 1 },
    { name: 'Jogador 2', points: 100, position: 1 },
    { name: 'Jogador 3', points: 100, position: 1 },
  ];

  const handlePlayAgain = () => {
    localStorage.removeItem('gameInfo')
    navigate('/profile'); // Ajuste a rota conforme necessário
  };

  const handleExit = () => {
    localStorage.clear()
    navigate('/'); // Redireciona para a tela inicial ou para onde preferir
  };

  useEffect(() => {
    const storedGameInfo = JSON.parse(localStorage.getItem('gameInfo'));
    setGameInfo(storedGameInfo);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width:'100vw',
        backgroundSize: 'cover',
        flexDirection: 'column',
      }}
    >

      {gameInfo.results&&gameInfo.results[0].score===gameInfo.results[1].score? (
         <Typography sx={{ fontWeight: 'bold', fontSize: '44px', color: '#ffff55', marginBottom: 3 }}>EMPATE</Typography>
        ):(<div></div>)}
     

      {/* Container do pódio */}
      <Box
        sx={{
          width: 450,
          padding: 3,
          borderRadius: 2,
          backgroundColor: '#0d1b2a',
          border: '5px solid #ff6f61',
          display: 'flex',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems:'center',
          alignSelf:'center',
          justifyContent:'space-around',
          textAlign: 'center',
        }}
      >
       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       {gameInfo.results&&gameInfo.results[0].score!==gameInfo.results[1].score? (
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ff6f61', marginBottom: 3 }}>1º LUGAR</Typography>
        ):(<div></div>)}
           
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: '#ff6f61',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 1,
                marginBottom: 1,
              }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
            {gameInfo.results ? gameInfo?.results[0].username : ""}
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
            {gameInfo.results ? gameInfo?.results[0].score : ""}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {gameInfo.results&&gameInfo.results[0].score!==gameInfo.results[1].score? (
         <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ff6f61', marginBottom: 3 }}>2º LUGAR</Typography>
        ):(<div></div>)}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: '#ff6f61',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 1,
                marginBottom: 1,
              }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
              {gameInfo.results ? gameInfo?.results[1].username : ""}
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
            {gameInfo.results ? gameInfo?.results[1].score : ""}
            </Typography>
          </Box>
      </Box>

      {/* Botões para jogar novamente e sair */}
      <Box sx={{ display: 'flex', gap: 5, marginTop: 3 }}>
        <Button
          variant="contained"
          onClick={handlePlayAgain}
          sx={{
            backgroundColor: '#ff6f61',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
        >
          JOGAR NOVAMENTE
        </Button>
        <Button
          variant="contained"
          onClick={handleExit}
          sx={{
            backgroundColor: '#ff6f61',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
        >
          SAIR
        </Button>
      </Box>
    </Box>
  );
}

export default PodiumScreen;
