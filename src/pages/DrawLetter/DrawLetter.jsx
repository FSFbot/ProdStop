import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LetterSlotMachine from './slotmachine.jsx';

function DrawLetter({ onClose,finalLetter,rounds,numRounds }) {
  const [letter, setLetter] = useState('');
  const [isSpinning, setIsSpinning] = useState(true);
  const [numRound,setNumRound]=useState(rounds)
  const navigate = useNavigate();

  const generateRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  useEffect(() => {
    setNumRound(numRound)
    const randomLetter = generateRandomLetter();
    setLetter(randomLetter);
  }, []);

  const handleAnimationComplete = () => {
    setIsSpinning(false);
    onClose(); // Fecha o modal ao término da animação
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(6, 47, 94, 0.8)',
        flexDirection: 'column',
        position: 'absolute',
      }}
    >
      {/* <Typography
        sx={{
          position: 'absolute',
          top: '7%',
          fontWeight: 'bolder',
          fontSize: '38px',
          color: '#fff',
        }}
      >
        RODADA {numRound+1} / {numRounds}
      </Typography> */}

      <LetterSlotMachine
        finalLetter={finalLetter}
        onAnimationComplete={handleAnimationComplete}
      />

      {!isSpinning && (
        <Button
          variant="contained"
          onClick={() => navigate('/game-screen', { state: { letter } })}
          sx={{
            marginTop: 3,
            backgroundColor: '#f74440',
            color: '#fff',
            '&:hover': { backgroundColor: '#d32f2f' },
          }}
        >
          INICIAR JOGO
        </Button>
      )}
    </Box>
  );
}

export default DrawLetter;
