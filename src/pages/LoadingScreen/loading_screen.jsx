import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import './loading.css'
import LetterAnimation from './letteranimation';
function LoadingScreen() {
  const navigate = useNavigate();
  const [gameInfo, setGameInfo] = useState(null);

  const PlayerBox = ({ username }) => (
    <Box
      sx={{
        width: '80px',
        height: '80px',
        backgroundColor: '#e94e4e',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        color:'white',
        marginBottom: '10px',
        animation: 'slideUpDown 2s ease-in-out infinite', // Applying animation
      }}
    >
     <span className='user'> {username}</span>
    </Box>
  );
  // Effect to load game info from localStorage and handle redirection
  useEffect(() => {
    // Fetch the game info from localStorage
    const storedGameInfo = localStorage.getItem('gameInfo');
    let test = ''
    if (storedGameInfo) {
      // Parse and set the game info in the state
      const parsedGameInfo = JSON.parse(storedGameInfo);
      setGameInfo(parsedGameInfo);
      console.log(parsedGameInfo)
      test=parsedGameInfo.time
    }
  
    // Set a timer to navigate after 10 seconds
    const timer = setTimeout(() => {
      // Only navigate when gameInfo is available
        navigate('/game-screen', { state: { time: test } }); // Pass time in location state
    }, 5000); // 10000ms = 10 seconds
  
    // Cleanup the timeout when the component unmounts or when dependencies change
    return () => clearTimeout(timer);
  }, [navigate]); // T

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        zIndex:200
      }}
    >
        <Typography sx={{
            fontSize:'60px',
            color:"white",
            fontWeight:'bolder',
            marginTop:'100px',
            zIndex:200
        }}>
            <LetterAnimation string_txt={'INICIANDO'}></LetterAnimation>
            <LetterAnimation string_txt={'PARTIDA'}></LetterAnimation>
        </Typography>
      <Box sx={{display:'flex',textAlign:'center',marginBottom:'150px',width:'100vw',flexDirection:'row',justifyContent:'space-around',alignItems:'center',alignContent:'center'}}>
        {gameInfo && gameInfo.users && gameInfo.users.length > 0 ? (
          gameInfo.users.map((user, index) => (
            <PlayerBox key={index} username={user.username} />
          ))
        ) : (
          <div>No players found.</div>
        )}
      </Box>
    </Box>
  );
}

export default LoadingScreen;
