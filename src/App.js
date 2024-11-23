// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import GameOptions from './pages/GameOptions/GameOptions';
import DrawLetter from './pages/DrawLetter/DrawLetter';
import GameScreen from './pages/GameScreen/GameScreen';
import StopScreen from './pages/StopScreen/StopScreen';
import WaitingRoom from './pages/WaintingRoom/WaintigRoom'; // Importar a nova página
import UseAnimationToggle from './animations/animation.jsx';
import LoadingScreen from './pages/LoadingScreen/loading_screen.jsx';
import PodiumScreen from './pages/PodiumScreen/PodiumScreen.jsx';
import { WebSocketProvider } from './services/WebSocketContext.js';
const theme = createTheme({
  palette: {
    primary: {
      main: '#084080',
    },
    secondary: {
      main: '#041931',
    },
  },
});


function App() {
  return (

      <Router>
        <MainContent />
      </Router>
   
  );
}


function MainContent() {
  const location = useLocation();

  // Define a rota em que você não quer mostrar a animação
  const hideAnimationOnRoutes = ['/special'];

  return (
    <ThemeProvider theme={theme}>
      {!hideAnimationOnRoutes.includes(location.pathname) && <UseAnimationToggle />}
    <WebSocketProvider>

      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/game-options" element={<GameOptions />} />
          <Route path="/draw-letter" element={<PrivateRoute><DrawLetter /></PrivateRoute>} />
          <Route path="/game-screen" element={<PrivateRoute><GameScreen /></PrivateRoute>} />
          <Route path="/stop" element={<PrivateRoute><StopScreen /></PrivateRoute>} />
          {/* <Route path="/validation" element={<ValidationScreen />} /> */}
          <Route path="/waiting-room" element={<PrivateRoute><WaitingRoom /></PrivateRoute>} /> {/* Nova rota */}
          <Route path="/loading" element={<PrivateRoute><LoadingScreen /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><PodiumScreen /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>


      </div>
    </WebSocketProvider>

    </ThemeProvider>
  );
  function PrivateRoute({ children }) {
    const token = localStorage.getItem('userInfo');
    return token ? children : <Navigate to="/" />;
  }
}

export default App;
