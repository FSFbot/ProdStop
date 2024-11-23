import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Chip, Button, Typography, DialogTitle, Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import WebSocket2 from '../../services/WebSocket';
import { useNavigate } from 'react-router-dom';
import loading_gif from './Loading-Stop.gif';
import './gif.css'
import { useWebSocket } from '../../services/WebSocketContext';

const Themes = ({ gameThemes }) => {
  return (
    <>
      {gameThemes && gameThemes.map((theme) => (
        <Chip key={theme} label={theme} sx={{ bgcolor: '#ff7043', color: '#fff' }} />
      ))}
    </>
  );
};

const PlayerBox = ({ username }) => (
  <Box sx={{
    width: '80px',
    height: '80px',
    backgroundColor: '#e94e4e',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    {username}
  </Box>
);

const GameModal = ({open, onClose, gameCode, game_themes }) => {
  const { roomCode, handleCreateRoom,setIsConnected, handleEnterRoom, themes, socket } = useWebSocket(); // Acessando o WebSocket
  const navigate = useNavigate();
  const [userinfo, setUserInfo] = useState({});
  const [newPlayer, setNewPlayer] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);
  const [isCopied, setIsCopied] = useState(false); // Estado para saber se o texto foi copiado

  const textToCopy = '';
  // Função para detectar quando um novo jogador entra
  const handleNewPlayer = () => {
    setNewPlayer(true);  // Define que um novo jogador entrou
  };

  const goToGame = async () => {
    setNewPlayer(true)
    const game = localStorage.getItem('gameInfo')
    const parsedGameInfo = JSON.parse(game);
    setGameInfo(parsedGameInfo);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    navigate("/loading");
  };

  useEffect(() => {
    const userCache = JSON.parse(localStorage.getItem('userInfo'));
    if (userCache && userCache.token) {
      setUserInfo(userCache);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const storedGameInfo = localStorage.getItem('gameInfo');
    if (storedGameInfo) {
      try {
        const parsedGameInfo = JSON.parse(storedGameInfo);
        setGameInfo(parsedGameInfo);
      } catch (error) {
        console.error("Erro ao parsear 'gameInfo' do localStorage:", error);
        setGameInfo(null);
      }
    }
  }, []);

  // Quando o WebSocket receber um novo jogador, chamar a função handleNewPlayer
  useEffect(() => {
    if (socket) {
      socket.on('enter_lobby', goToGame);  // Supondo que o evento seja 'new_player'
    }

    // Cleanup: remover o listener quando o componente for desmontado
    return () => {
      if (socket) {
        socket.off('enter_lobby', goToGame);
      }
    };
  }, [socket]);

  const onBack = () => {
    const userCache = JSON.parse(localStorage.getItem('userInfo'));
    setNewPlayer(false);
    onClose();
    if (userCache?.host) {
      setIsConnected(false);
    }
    localStorage.removeItem('gameInfo');
    setNewPlayer(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gameCode)
      .then(() => {
        setIsCopied(true); // Alterar o estado para mostrar que o texto foi copiado
        setTimeout(() => setIsCopied(false), 2000); // Resetar após 2 segundos
      })
      .catch(err => console.error('Erro ao copiar: ', err));
  };


  return (
    <Dialog open={open} onClose={(event, reason) => {
      if (reason === "backdropClick" || reason === "escapeKeyDown") {
        return;
      }
      onBack();
    }} 
    fullWidth maxWidth="sm" PaperProps={{
      sx: {
        borderRadius: '20px',
        backgroundColor: '#084080',
        border: '10px solid #201E1D',
        width: '600px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
      },
    }}>
      <DialogTitle sx={{
        textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold', fontSize: '25px', backgroundColor: '#201E1D'
      }}>
        <IconButton
          aria-label="back"
          onClick={onBack}
          sx={{
            position: 'absolute', left: 8, top: 8, color: '#FFFFFF', backgroundColor: '#EB2D37', border: '5px #EB2D37 solid',
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          AGUARDANDO JOGADORES
        </Typography>

        {!newPlayer ? (
          <div className="gif-container">
            <img src={loading_gif} alt="loading" className="gif" />
          </div>
        ) : (<div></div>)}
      </DialogTitle>

      <DialogContent sx={{
        bgcolor: '#084080', p: 3, display: 'flex', justifyContent: "space-around", flexDirection: 'column', alignItems: "center"
      }}>
        <Typography variant="subtitle1" sx={{ color: 'white', marginTop: 3, fontWeight: 'bold' }}>
          CÓDIGO DE PARTIDA: <span className='code_span' style={{ fontWeight: 'bolder', fontSize: 25, color: "gold" }}>{gameCode}

          </span>
          <button class="copy-btn" onClick={handleCopy}>Copiar</button>
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
          TEMAS DA PARTIDA
        </Typography>
        <Box display="flex" alignContent="center" alignItems='center' flexWrap="wrap" gap={1} mb={2}>
          <Themes gameThemes={game_themes} />
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {newPlayer ? (
            // Se newPlayer for verdadeiro e gameInfo.users não estiver vazio, mapeia os usuários
            gameInfo.users.map((user) => (
              <PlayerBox key={user.username} username={user.username} />
            ))
          ) : (
            // Caso contrário, apenas renderiza o jogador atual
            <PlayerBox username={userinfo.username} />
          )}
        </Box>



        {/* {gameInfo ?(
        gameInfo.number_members>1? (
          <Button onClick={goToGame} sx={{backgroundColor:'red',color:"white"}}>Iniciar Partida</Button>
        ) : (
          <div className="gif-container">
            <img src={loading_gif} alt="loading" className="gif"></img>
          </div>
        )):(<div></div>)} */}


      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
