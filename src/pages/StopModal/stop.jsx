import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import UseAnimationToggle from '../../animations/animation';
import { useNavigate } from 'react-router-dom';
import WebSocket2 from '../../services/WebSocket';

function StopModal({ onClose,onLastRound }) {
  const { handleValidateStop, socket } = WebSocket2();
    const navigate = useNavigate();
  const generateRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };
  useEffect(() => {
    // if (onLastRound===true){
    //     const timer = setTimeout(() => {
    //         // Navegar para a tela de validação após 5 segundos
    //         navigate('/validation', {state: {letter: 'A', category: 'CEP'}}); // Aqui você pode passar dados reais
    //     }, 5000);
    
    //     return () => clearTimeout(timer); // Limpar o temporizador ao desmontar
    // }
   
}, [navigate]);

  // Animações com Emotion
  const fadeInScaleUp = keyframes`
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `;

  const backgroundChange = keyframes`
    0% {
      background-color: #ffc94d;
    }
    100% {
      background-color: #ff6347;
    }
  `;

  // Função para chamar o onClose após a animação
  const handleAnimationEnd = () => {
    onClose(); // Chama a função para fechar o modal ao fim da animação
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        backgroundColor: '#ffc94d',
        flexDirection: 'column',
        zIndex: 10,
        animation: `${backgroundChange} 2s ease-in-out`, // Animação de cor de fundo
      }}
      onAnimationEnd={handleAnimationEnd} // Chama onClose após o fim da animação
    >
        <UseAnimationToggle />
      <Box
        sx={{
          width: 300,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f74440',
          border: '15px solid #fff',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: `${fadeInScaleUp} 2s ease-out`, // Animação do box e texto
        }}
        onAnimationEnd={handleAnimationEnd} // Chama onClose após o fim da animação
      >
        <Typography
          sx={{
            fontSize: '48px',
            color: '#fff',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Efeito de sombra no texto
          }}
        >
          STOP
        </Typography>
      </Box>
    </Box>
  );
}

export default StopModal;
