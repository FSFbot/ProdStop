import React, { useState,useEffect } from 'react';
import { Dialog, DialogContent, Button, TextField, DialogTitle,Typography, Chip, IconButton, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import WaitingPlayersModal from "./WaitingPlayersModal.jsx"
import { ArrowBack } from '@mui/icons-material';

function GameOptionsModal({ open, onClose,handleCreateGame,roomCode,game_themes }) {
  const [themes, setThemes] = useState(['CEP', 'FRUTA']);
  const [newTheme, setNewTheme] = useState('');
  const [selectedTime, setSelectedTime] = useState(60); 
  const [selectedRounds, setSelectedRounds] = useState('5'); 
  const [userinfo,setUserInfo] = useState({});
  const navigate = useNavigate();

  const [isModalOpen3, setModalOpen3] = useState(false);
 


  const handleCloseModal3 = () => {
    setModalOpen3(!isModalOpen3);  
    localStorage.removeItem('gameInfo')// Fecha o modal
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


    const handleJoinRoom = () => {
        const roomData = {
            id_user: userinfo.id,
            time: selectedTime,
            rounds: selectedRounds,
            max_members: 10,
            // themes: themes,
        };
        handleCreateGame('create_lobby',roomData)
        console.log(roomCode)
        if(roomData){
          onClose()
          setModalOpen3(true)

        }
        // handleClickInsideModal()
    };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);  // Atualiza o estado com o valor selecionado
  };

  const handleRoundsSelect = (rounds) => {
    setSelectedRounds(rounds);  // Atualiza o estado com o valor selecionado
  };

  const handleAddTheme = () => {
    if (newTheme.trim() !== '') {
      
      setNewTheme('');
    }
  };

  const handleDeleteTheme = (themeToDelete) => {
    setThemes(themes.filter((theme) => theme !== themeToDelete));
  };

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
          OPÇÕES DE PARTIDA

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

       


        {/* Time Selection */}
        <Typography sx={{ fontWeight: 'bold', mb: 1,color:'#FFFFFF',marginTop:3 }}>TEMPO POR RODADA:</Typography>
         {/* Botões de seleção de tempo */}
      <Box display="flex" gap={2}>
      <Button
          variant={selectedTime === 30 ? 'contained' : 'outlined'}  // Destaque o botão selecionado
          sx={{
            bgcolor: selectedTime === 30 ? '#f74440' : 'transparent',  // Cor de fundo condicional
            color: selectedTime === 30 ? '#fff' : '#f74440',            // Cor do texto condicional
            borderColor: '#f74440'
          }}
          onClick={() => handleTimeSelect(30)}  // Define o tempo selecionado
        >
          30 SEG
        </Button>
        <Button
          variant={selectedTime === 60 ? 'contained' : 'outlined'}  // Destaque o botão selecionado
          sx={{
            bgcolor: selectedTime === 60 ? '#f74440' : 'transparent',  // Cor de fundo condicional
            color: selectedTime === 60 ? '#fff' : '#f74440',            // Cor do texto condicional
            borderColor: '#f74440'
          }}
          onClick={() => handleTimeSelect(60)}  // Define o tempo selecionado
        >
          1 MIN
        </Button>
        <Button
          variant={selectedTime === 90 ? 'contained' : 'outlined'}
          sx={{
            bgcolor: selectedTime === 90 ? '#f74440' : 'transparent',
            color: selectedTime === 90 ? '#fff' : '#f74440',
            borderColor: '#f74440'
          }}
          onClick={() => handleTimeSelect(90)}
        >
          1:30 MIN
        </Button>
      </Box>
      <Divider color='white' sx={{marginTop:2}} ></Divider>

        {/* Rounds Selection */}
        <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 1 ,color:'#FFFFFF'}}>RODADAS:</Typography>
        <Box display="flex" gap={2}>
        <Button
          variant={selectedRounds === '5' ? 'contained' : 'outlined'}  // Destaque o botão selecionado
          sx={{
            bgcolor: selectedRounds === '5' ? '#f74440' : 'transparent',  // Cor de fundo condicional
            color: selectedRounds === '5' ? '#fff' : '#f74440',            // Cor do texto condicional
            borderColor: '#f74440'
          }}
          onClick={() => handleRoundsSelect('5')}  // Define o tempo selecionado
        >
          5
        </Button>
        <Button
          variant={selectedRounds === '1' ? 'contained' : 'outlined'}
          sx={{
            bgcolor: selectedRounds === '1' ? '#f74440' : 'transparent',
            color: selectedRounds === '1' ? '#fff' : '#f74440',
            borderColor: '#f74440'
          }}
          onClick={() => handleRoundsSelect('1')}
        >
          10
        </Button>
      </Box>
      <Divider color='white' sx={{marginTop:2}} ></Divider>

        {/* Players Selection
        <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>NÚMERO DE JOGADORES:</Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" sx={{ bgcolor: '#f74440', color: '#fff' }}>5</Button>
          <Button variant="outlined" sx={{ color: '#f74440', borderColor: '#f74440' }}>10</Button>
        </Box> */}

        {/* Themes Section */}
       

        {/* Premium Section */}
        <Typography sx={{ fontSize: '12px', textAlign: 'center',color:'gold', mt: 2 }}>
          SEJA PREMIUM PARA CRIAR PARTIDAS DE FORMA ILIMITADA.
        </Typography>

        {/* Create Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#201E1D', color: '#fff', mt: 2, fontWeight: 'bold'
        }}
        onClick={() => handleJoinRoom()}
        aria-label={"Criar nova Sala"}
        >
          CRIAR
        </Button>
      </DialogContent>
    </Dialog>

    <WaitingPlayersModal open={isModalOpen3} onClose={handleCloseModal3} gameCode= {roomCode} game_themes={game_themes}> </WaitingPlayersModal>

    </Box>
   
  );
}

export default GameOptionsModal;