import React, { useState,useEffect } from 'react';
import { Box,Dialog,DialogContent,DialogTitle, Button, Typography, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import WaitingPlayersModal from "./WaitingPlayersModal.jsx"
import { ArrowBack } from '@mui/icons-material';

function EnterGameModal({open, onClose,roomCode,handleJoinGame}) {
  const [code, setCode] = useState('');
  const [userinfo,setUserInfo] = useState({});
  const navigate = useNavigate();
  const [isModalOpen3, setModalOpen3] = useState(false);
  const [gameInfo,setGameInfo] = useState({});
  const [isInLobby,setIsInLobby]=useState({});
  const [gameThemes,setGameThemes]=useState([]);
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleCloseModal3 = () => {
    setModalOpen3(!isModalOpen3);  
};
  useEffect(() => {
    const userCache = JSON.parse(localStorage.getItem('userInfo'));

    if (userCache && userCache.token) {
        console.log(userCache.token);
        setUserInfo(userCache)
    } else {
        navigate("/");
    }
   
  }, []);

  useEffect(() => {
    const checkGameInfo = () => {
      const gameCache = JSON.parse(localStorage.getItem('gameInfo'));
  
      if (gameCache) {
        setGameInfo(gameCache);
        setGameThemes(gameCache.themes)
        setIsInLobby(true);
      } else {
        setIsInLobby(false);
      }
    };

    checkGameInfo();
    const intervalId = setInterval(checkGameInfo, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const handleEnter = () => {
    const roomData = {
      code_lobby:code,
      id_user: userinfo.id,
      // themes: themes,
    };
    handleJoinGame('enter_lobby',roomData)
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    userInfo.roomCode = code
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setModalOpen3(true)
  };


{/* <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    backgroundColor: '#084080',
                    border: '10px solid #201E1D',
                    width: '500px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '25px',
                    position: 'relative',
                    backgroundColor:'#201E1D'
                }}
            >
                {title}
                {backEnabled && (
                    <IconButton
                        aria-label="back"
                        onClick={handleBack}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: 8,
                            color: '#FFFFFF',
                            backgroundColor: '#EB2D37',
                            border: '5px #EB2D37 solid',
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                )}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: '#FFFFFF',backgroundColor:'#EB2D37',border:'5px #EB2D37 solid' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ textAlign: 'left', color: '#FFFFFF' }}>
                {children}
            </DialogContent>
            {actions && (
                <DialogActions sx={{ justifyContent: 'center' }}>
                    {actions}
                </DialogActions>
            )}
        </Dialog> */}

  return (
    <Box >
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
                sx: {
                    borderRadius: '20px',
                    backgroundColor: '#084080',
                    border: '10px solid #201E1D',
                    width: '500px',
                    height:'400px',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around'
                },
            }}>
               <DialogTitle
                sx={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '25px',
                    position: 'relative',
                    backgroundColor:'#201E1D'
                }}
            >
              ENTRAR EM PARTIDA
                <IconButton
                        aria-label="back"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: 8,
                            color: '#FFFFFF',
                            backgroundColor: '#EB2D37',
                            border: '5px #EB2D37 solid',
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

            </DialogTitle>
         <DialogContent sx={{ bgcolor: '#084080', p: 3, position: 'relative' }}>
      <Typography sx={{ textAlign: 'center', fontSize:'20px',fontWeight: 'bold',color:"#FFFFFF",margin:5 }}>
        INSIRA O CÓDIGO DE PARTIDA ABAIXO PARA PODER ENTRAR.
      </Typography>

      {/* Campo de texto para código */}
      <TextField
        variant="outlined"
        placeholder="Insira o código aqui."
        value={code}
        onChange={handleCodeChange}
        fullWidth
        InputProps={{
          sx: {
            bgcolor: '#fff',
            borderRadius: 2,
          },
        }}
      />

      {/* Botão de Entrar */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop:8,
          bgcolor: '#201E1D',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: 2,
          '&:hover': {
            bgcolor: '#201E1D', // Manter a mesma cor no hover
          },
        }}
        onClick={handleEnter}
      >
        ENTRAR
      </Button>
      </DialogContent>
      </Dialog>
    
      <WaitingPlayersModal open={isModalOpen3} onClose={handleCloseModal3} gameCode= {code} game_themes={gameThemes}> </WaitingPlayersModal>
      
    </Box>
  );

}

export default EnterGameModal;
