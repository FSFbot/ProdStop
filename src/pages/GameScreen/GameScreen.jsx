import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DrawLetter from '../DrawLetter/DrawLetter';
import WebSocket2 from '../../services/WebSocket';
import StopModal from '../StopModal/stop';
import ValidationModal from '../ValidateModal/validate';
import { useWebSocket } from '../../services/WebSocketContext';
import BackgroundAudio from '../../shared/components/Audio/BackgroundAudio';
import tempoRodada from '../../assets/tempo-rodada.wav';
import stopRodada from '../../assets/click-botao.wav';

const GameScreen = () => {
  const { roomCode, handleReceiveStop, handleTriggerStop, handleReturnStop, validateStop, socket } = useWebSocket()
  const location = useLocation();
  const { time } = location.state || { time: 0 };  // Definindo um valor padrão de 0 para o tempo
  const navigate = useNavigate();

  const [selectedThemes, setSelectedThemes] = useState({});
  const [timeLeft, setTimeLeft] = useState(parseInt(time) || 0);  // Garantir que o tempo seja um número
  const [isDrawLetterOpen, setIsDrawLetterOpen] = useState(true);
  const [isValidatedOpen, setIsValidatedOpen] = useState(false);
  const [isStopOpen, setIsStopOpen] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [round, setRound] = useState(1);
  const [playAudio, setplayAudio] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Abertura do Modal de Validação
  const handleValidatedClose = () => {
    setIsValidatedOpen(false); // Fechar modal
  };
  const selectedThemesRef = useRef(selectedThemes);

  useEffect(() => {
    selectedThemesRef.current = selectedThemes;
  }, [selectedThemes]);
  // Atualiza a informação do jogo com os dados do localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    setUserInfo(userInfo)
    const storedGameInfo = JSON.parse(localStorage.getItem('gameInfo')) || {};  // Verifica se há dados no localStorage
    setGameInfo(storedGameInfo);
  }, []);

  // Atualiza o round e checa o tempo restante
  // useEffect(() => {
  //   if (round > (gameInfo.rounds)) {
  //     handleReturnStop('return_stop', {
  //       code_lobby: JSON.parse(localStorage.getItem('userInfo'))?.roomCode,
  //     });
  //   }
  // }, [round, gameInfo.rounds, navigate]);

  // Escutar evento 'trigger_stop' no WebSocket
  useEffect(() => {
    if (socket) {
      socket.on('trigger_stop', handleStopListener);
    }
    return () => {
      if (socket) {
        socket.off('trigger_stop', handleStopListener);
      }
    };
  }, [socket]);

  // Gerenciar o cronômetro
  useEffect(() => {
    let timer;

    if (timeLeft > 0 && !isDrawLetterOpen && !isValidatedOpen) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      handleStopOpen();  // Aciona a parada quando o tempo chega a 0
    }

    return () => clearInterval(timer); // Limpa o intervalo quando o tempo mudar
  }, [timeLeft, isDrawLetterOpen, isValidatedOpen]);

  // Função para atualizar o valor de cada tema selecionado
  const handleInputChange = (theme, e) => {
    setSelectedThemes({ ...selectedThemes, [theme]: e.target.value });
  };

  // Fechar o modal de DrawLetter
  const handleDrawLetterClose = () => {
    setIsDrawLetterOpen(false);
  };

  // Função de parada do jogo
  const handleStopOpen = () => {
    console.log(selectedThemes);

    handleTriggerStop('trigger_stop', {
      code_lobby: JSON.parse(localStorage.getItem('userInfo'))?.roomCode,
    });

  };

  // Função que lida com o evento de parada do WebSocket
  const handleStopListener = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const isPlayerOne = userInfo.host === true; // Identificar jogador 1 ou 2
    const delay = isPlayerOne ? 0 : 500; // Jogador 1 envia imediatamente, jogador 2 após 1 segundo

    // Capturar temas apenas para este jogador
    const currentPlayerThemes = { ...selectedThemesRef.current };

    // Construir payload específico para este jogador
    const payload = {
      code_lobby: userInfo.roomCode,
      id_user: userInfo.id, // Identifica unicamente o jogador
      double_points: false, // Exemplo: Jogador 1 recebe pontos duplos
      autocomplete: false, // Exemplo: Jogador 2 pode ter preenchimento automático
      receive_payload: currentPlayerThemes, // Apenas temas do jogador atual
    };

    console.log("Aguardando envio do payload. Delay:", delay);

    setTimeout(() => {
      console.log(`Payload enviado no receive_stop para jogador ${userInfo.id}:`, payload);
      handleReceiveStop('receive_stop', payload);

      // Incrementar rodada e resetar o cronômetro
      setTimeLeft(time);
      setIsStopOpen(true);
      setIsDrawLetterOpen(true);

      // Limpar campos de entrada
      setSelectedThemes({});
    }, delay); // Aplica o atraso baseado no jogador

  };

  // Fechar o modal de Stop e abrir o de validação
  const handleStopClose = () => {
    setIsStopOpen(false); // Fecha StopModal
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('userInfo')).host === true) {
        console.log("TESTE")
        validateStop('validate_responses', {
          code_lobby: JSON.parse(localStorage.getItem('userInfo'))?.roomCode,
          letra: round > gameInfo.rounds ? gameInfo.letters[round - 2].toUpperCase() : gameInfo.letters[round - 1].toUpperCase(),
        });
        setRound(round + 1);

      }
      else {
        setRound(round + 1);

      }

      setIsValidatedOpen(true)


    }, 300); // Abre ValidationModal após um pequeno delay
    setTimeout(() => {
      setIsValidatedOpen(false); // Fecha o ValidationModal
      // TODO: VERIFICAR EMIT DO RETURN STOP
      if (round >= gameInfo.rounds) {
        handleReturnStop('return_stop', {
          code_lobby: JSON.parse(localStorage.getItem('userInfo'))?.roomCode,
        });
      }
    }, 30000); // Fecha o modal após 30 segundos

  };

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 200,
      }}
    >
      {isDrawLetterOpen && (
        <DrawLetter
          onClose={handleDrawLetterClose}
          rounds={round}
          numRounds={gameInfo.rounds || 0}
          finalLetter={gameInfo.letters && gameInfo.letters[round - 1] ? gameInfo.letters[round - 1].toUpperCase() : ""}
        />
      )}

      {isStopOpen && (
        <StopModal onClose={handleStopClose} onLastRound={round >= (gameInfo.rounds || 0) - 1} />
      )}

      {isValidatedOpen && (
        <ValidationModal open={isValidatedOpen} close={handleValidatedClose} round={round - 1} />
      )}

      <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: '#fff', marginBottom: 2 }}>
        LETRA: {gameInfo.letters && gameInfo.letters[round - 1] ? gameInfo.letters[round - 1].toUpperCase() : ""}
      </Typography>

      <Box
        sx={{
          width: 600,
          padding: 3,
          borderRadius: 4,
          backgroundColor: '#333',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          textAlign: 'center',
        }}
      >
        {gameInfo.themes && gameInfo.themes.map((theme, index) => (
          <Box key={index}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff', marginBottom: 1 }}>
              {theme}
            </Typography>
            <TextField
              placeholder="Escreva aqui..."
              variant="outlined"
              fullWidth
              key={theme}
              value={selectedThemes[theme] || ""}
              onChange={(e) => handleInputChange(theme, e)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 400, marginTop: 3 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>
          RODADA: {round} / {gameInfo.rounds || 0}
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>
          TEMPO: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
        </Typography>
      </Box>

      <Button
        variant="contained"
        // disabled={isButtonDisabled}
        onClick={handleStopOpen}
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: '#f74440',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '18px',
          marginTop: 3,
        }}
      >
        STOP
      </Button>

      {!isDrawLetterOpen && validateStop && <BackgroundAudio audioSrc={tempoRodada} onAudioEnd={playAudio} />}
      {isStopOpen  && isDrawLetterOpen && <BackgroundAudio audioSrc={stopRodada} onAudioEnd={playAudio} />}

    </Box>
  );
};

export default GameScreen;
