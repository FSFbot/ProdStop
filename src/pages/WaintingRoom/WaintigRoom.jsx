// src/pages/WaitingRoom/WaitingRoom.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

function WaitingRoom() {
    const navigate = useNavigate();
    const location = useLocation();

    // Estado inicial com alguns jogadores simulados
    const [players, setPlayers] = useState([
        { name: "Jogador 1" },
        { name: "Jogador 2" },
        { name: "Jogador 3" },
        { name: "Jogador 4" },
    ]);

    // Código de partida gerado (simulado)
    const gameCode = location.state?.gameCode || "000000";

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f74440',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: 400,
                    padding: 3,
                    borderRadius: 4,
                    backgroundColor: '#ffc94d',
                    position: 'relative',
                    border: '10px solid #f74440',
                    clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
                }}
            >
                {/* Botão para voltar */}
                <IconButton
                    onClick={() => navigate('/profile')}
                    sx={{ position: 'absolute', top: 8, left: 8, color: '#f74440' }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography sx={{ textAlign: 'center', color: '#f74440', fontWeight: 'bold', fontSize: '24px', marginBottom: 2 }}>
                    AGUARDANDO JOGADORES
                </Typography>

                <Typography sx={{ textAlign: 'center', color: '#f74440', fontSize: '18px', marginBottom: 3 }}>
                    CÓDIGO DE PARTIDA: <span style={{ fontWeight: 'bold' }}>{gameCode}</span>
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                        textAlign: 'center',
                    }}
                >
                    {players.map((player, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: 1,
                                borderRadius: 2,
                                backgroundColor: '#f74440',
                                width: '100px',
                                height: '100px',
                                justifyContent: 'center',
                                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                            }}
                        >
                            <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>{player.name}</Typography>
                        </Box>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/game-screen')} // Exemplo de navegação para a próxima tela do jogo
                    sx={{
                        backgroundColor: '#ffc94d',
                        color: '#f74440',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginTop: 3,
                    }}
                >
                    INICIAR PARTIDA
                </Button>
            </Box>
        </Box>
    );
}

export default WaitingRoom;
