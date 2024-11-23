import React, {useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

function StopScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navegar para a tela de validação após 5 segundos
            navigate('/validation', {state: {letter: 'A', category: 'CEP'}}); // Aqui você pode passar dados reais
        }, 5000);

        return () => clearTimeout(timer); // Limpar o temporizador ao desmontar
    }, [navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#ffc94d',
                flexDirection: 'column',
            }}
        >
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
                }}
            >
                <Typography sx={{fontSize: '48px', color: '#fff', fontWeight: 'bold'}}>
                    STOP
                </Typography>
            </Box>
        </Box>
    );
}

export default StopScreen;
