import React, {useState, useEffect} from 'react';
import {Box, Typography, Button} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';

function ValidationScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    // Simulando dados de exemplo. Estes dados devem ser passados de acordo com o que foi preenchido pelos jogadores.
    const wordsToValidate = location.state?.words || [
        {word: 'Angola', isValid: true},
        {word: 'Brasil', isValid: false},
        {word: 'AAAAAA', isValid: false},
    ];

    const [timeLeft, setTimeLeft] = useState(15); // Tempo para validação

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    // Simula o término do tempo de validação
                    handleValidationComplete();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleValidationComplete = () => {
        // Lógica para finalizar a validação e mover para o próximo passo (ex: mostrar resultado final)
        console.log('Validação concluída');
        // Redirecionar para uma página de resultados ou próxima fase
    };

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
            <Typography sx={{fontWeight: 'bold', fontSize: '24px', color: '#f74440', marginBottom: 2}}>
                LETRA: {location.state?.letter || 'A'}
            </Typography>

            <Typography sx={{fontWeight: 'bold', fontSize: '20px', color: '#f74440', marginBottom: 2}}>
                VALIDAÇÃO: {location.state?.category || 'CEP'}
            </Typography>

            <Box
                sx={{
                    width: 400,
                    padding: 3,
                    borderRadius: 4,
                    backgroundColor: '#f74440',
                    border: '10px solid #f74440',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 2,
                    textAlign: 'center',
                    clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
                }}
            >
                {wordsToValidate.map((item, index) => (
                    <Box key={index} sx={{textAlign: 'center'}}>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                color: item.isValid ? '#fff' : '#000',
                                backgroundColor: item.isValid ? '#000' : '#fff'
                            }}
                        >
                            {item.word}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => console.log(`Palavra ${item.word} validada`)}
                            sx={{
                                backgroundColor: '#ffc94d',
                                color: '#f74440',
                                fontWeight: 'bold',
                                width: '60px',
                                marginTop: 1
                            }}
                        >
                            ✓
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => console.log(`Palavra ${item.word} rejeitada`)}
                            sx={{
                                backgroundColor: '#f74440',
                                color: '#fff',
                                fontWeight: 'bold',
                                width: '60px',
                                marginTop: 1
                            }}
                        >
                            ✗
                        </Button>
                    </Box>
                ))}
            </Box>

            <Typography sx={{fontWeight: 'bold', fontSize: '16px', color: '#f74440', marginTop: 2}}>
                TEMPO: {timeLeft}
            </Typography>

            <Button
                variant="contained"
                onClick={handleValidationComplete}
                sx={{
                    backgroundColor: '#ffc94d',
                    color: '#f74440',
                    fontWeight: 'bold',
                    width: 150,
                    height: 50,
                    marginTop: 2,
                }}
            >
                VALIDAR
            </Button>
        </Box>
    );
}

export default ValidationScreen;
