import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { LogoutOutlined } from '@mui/icons-material';
import { logOut } from '../../services/Requests.js';
import GameOptionsModal from "./CreateGameModal.jsx";
import EnterGameModal from './EnterGameModal.jsx';
import CardGeneric from '../../shared/components/CardGeneric/CardGeneric.jsx';
import { useWebSocket } from '../../services/WebSocketContext.js';

function Profile() {
  const { roomCode, handleCreateRoom, handleEnterRoom, themes, socket } = useWebSocket(); // Acessando o WebSocket
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    const userCache = JSON.parse(localStorage.getItem('userInfo'));

    if (userCache && userCache.token) {
      console.log("Token encontrado");
      setUserInfo(userCache);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleCloseModal = () => setModalOpen(!isModalOpen);
  const handleCloseModal2 = () => setModalOpen2(!isModalOpen2);

  const openCreateGame = () => setModalOpen(true);
  const handleJoinRoom = () => setModalOpen2(true);

  const logOutUser = async (token) => {
    if (token === null) {
      navigate("/");
    }
    await logOut(token);
    localStorage.removeItem('userInfo');
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <CardGeneric
        backEnabled={false}
        title={`Olá, ${userinfo.username}`}
        children={
          <div>
            <IconButton
              onClick={() => console.log('Ajuda clicada')}
              sx={{
                position: 'absolute', top: 10, right: 80, color: '#FFFFFF', backgroundColor: '#EB2D37',
                border: '5px #EB2D37 solid'
              }}
            >
              <HelpIcon />
            </IconButton>

            <IconButton
              onClick={() => console.log('Configurações clicadas')}
              sx={{
                position: 'absolute', top: 10, right: 10, color: '#FFFFFF', backgroundColor: '#EB2D37',
                border: '5px #EB2D37 solid'
              }}
            >
              <SettingsIcon />
            </IconButton>

            <IconButton
              onClick={() => logOutUser(userinfo.token)}
              sx={{
                position: 'absolute', top: 10, left: 10, color: '#FFFFFF', backgroundColor: '#EB2D37',
                border: '5px #EB2D37 solid'
              }}
            >
              <LogoutOutlined />
            </IconButton>

            <Typography sx={{ textAlign: 'center', color: '#FFFFF', fontWeight: 'bold', marginBottom: 2 }}>
              CONTA FREE <br />
              <Typography sx={{ color: '#f74440', fontWeight: 'bold' }}>SEJA PREMIUM.</Typography>
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'var(--third-color)',
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: 2,
              }}
              onClick={openCreateGame}
            >
              CRIAR PARTIDA
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'var(--third-color)',
                color: '#fff',
                fontWeight: 'bold',
              }}
              onClick={handleJoinRoom}
            >
              ENTRAR EM PARTIDA
            </Button>

            {/* Modais */}
            <GameOptionsModal
              open={isModalOpen}
              onClose={handleCloseModal}
              handleCreateGame={handleCreateRoom}
              roomCode={roomCode}
              game_themes={themes}
            />
            <EnterGameModal
              open={isModalOpen2}
              handleJoinGame={handleEnterRoom}
              roomCode={roomCode}
              onClose={handleCloseModal2}
            />
          </div>
        }
      />
    </Box>
  );
}

export default Profile;
