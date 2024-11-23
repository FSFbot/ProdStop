import React, { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Station_clock.png';
import logogif from '../../assets/clock_gif-3.gif'
import Button from '@mui/material/Button';
import './Home.css';
import ModalGenenric from '../../shared/components/ModalGeneric/ModalGeneric.jsx';
import UseAnimationToggle from '../../animations/animation.jsx'
const INITIAL_PAUSE_DURATION = 5000.00;     // Time before animation starts (ms)
const ANIMATION_CYCLE_DURATION = 3000.00; 

function Home() {
  const [animationsPaused, setAnimationsPaused] = useState(true);
  useEffect(() => {
    let initialPauseTimeout;
    let animationCycleInterval;

    const initializeAnimation = () => {
      // Start with initial pause duration
      initialPauseTimeout = setTimeout(() => {
        setAnimationsPaused(false);  // Start animation

        // Begin regular on/off cycle
        animationCycleInterval = setInterval(() => {
          setAnimationsPaused(prev => !prev);  // Toggle animation state consistently
        }, ANIMATION_CYCLE_DURATION);
      }, INITIAL_PAUSE_DURATION);
    };

    initializeAnimation();

    // Cleanup timeouts and intervals on component unmount
    return () => {
      clearTimeout(initialPauseTimeout);
      clearInterval(animationCycleInterval);
    };
  }, [animationsPaused, setAnimationsPaused]);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  return (
    
    <div className="home-container">
      
      
       {/* <div
    className="road"
   /> */}
     
   
   
 
      <div className="logo">
        <img className={`logo-image${animationsPaused ? '' : '-anm'}`} src={`${animationsPaused ? logo : logogif}`} alt="Stop Logo" />
      </div>

     
      
      <div className="menu">
      <Button
        variant="contained"
        onClick= {() => navigate('/login')}
        sx={{
          marginBottom: '20px',
          fontWeight: "bolder",
          fontSize: "20px",
          backgroundColor: "#201E1D",
          borderRadius: "30px",
          width: "120px",
          height: "50px",
          '&:hover': {
            backgroundColor: "#333", // Cor de fundo quando o botão é sobrevoado
            transform: "scale(1.05)", // Efeito de aumento ao passar o mouse
          },
        }}
      >Login</Button>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            marginBottom: '20px',
            fontWeight: "bolder",
            fontSize: "20px",
            backgroundColor: "#201E1D",
            borderRadius: "30px",
            width: "120px",
            height: "50px",
            '&:hover': {
              backgroundColor: "#333", // Cor de fundo quando o botão é sobrevoado
              transform: "scale(1.05)", // Efeito de aumento ao passar o mouse
            },
          }}
        >
          Ajuda
        </Button>
      </div>
      <ModalGenenric
        open={open}
        handleClose={handleClose}
        backEnabled={false}
        title="Como Jogar?"
        
        children={
          <div>
            <p>
            - Os jogadores terão a missão de pensar e escrever palavras de diversas temas, com uma letra sorteada em cada rodada.<br />
            - O primeiro que escrever tudo e clicar em “stop” irá parar a rodada.<br />
            - Se um palavra não for repetida, vale 10 pontos, caso contrário vale 5<br />
            <b>O Vencedor é o jogador que TIVER MAIS PONTOS AO FINAL DO JOGO.</b>
            </p>
            <h3 style={{ color: '#ffc94d', textAlign: 'center' }}>Conta Premium</h3>
            <p>
            Pelo valor fixo de R$ 10,00, tenha acesso a conta premium e garanta benefícios dentro de nosso jogo como poderes exclusivos.
            </p>
          </div>
        }
      />
    
    </div>
  );
}

export default Home;