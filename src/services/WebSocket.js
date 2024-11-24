import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// Instância única do WebSocket fora do componente
const socket = io('wss://stop-backend.up.railway.app', { autoConnect: false });

const WebSocket2 = () => {
  const navigate = useNavigate();

  // Estados para gerenciar informações e conexão
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomCode, setRoomCode] = useState('');
  const [themes, setThemes] = useState([]);
  const [roundTime, setRoundTime] = useState(0);
  const [isInLobby, setLobby] = useState(false);
  const eventsRegistered = useRef(false); // Rastreia registro de eventos

  useEffect(() => {
    // Conectar o socket se ainda não estiver conectado
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      setIsConnected(true);
      console.log('Conectado ao WebSocket');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('Desconectado do WebSocket');
    };

    const handleCreateLobby = (data) => {
      console.log('Código da sala recebido:', data.code_lobby);
      setRoomCode(data.code_lobby);
      setThemes(data.themes);

      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      userInfo.host = true;
      userInfo.roomCode = data.code_lobby;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    const handleEnterLobby = (data) => {
      console.log('Usuário entrou na sala:', data);
      setLobby(true);
      setRoundTime(parseInt(data.time));

      const gameInfo = {
        time: data.time,
        rounds: data.rounds,
        max_members: data.max_members,
        number_members: data.number_members,
        themes: data.themes,
        users: data.users,
        letters: data.letters,
      };
      localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    };

    const handleResultsStop=(data)=>{
      console.log(data.result)
      console.log(data)
      let gameInfo = JSON.parse(localStorage.getItem("gameInfo")) || {};
      gameInfo.results = data.result;
      localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
  }

    const handleValidate = (data) => {
      console.log('Validação recebida:');
      // Lógica de validação adicional aqui
    };

    // Registrar eventos apenas uma vez
    if (!eventsRegistered.current) {
      eventsRegistered.current = true;
      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      socket.on('create_lobby', handleCreateLobby);
      socket.on('enter_lobby', handleEnterLobby);
      socket.on('validate_responses', handleValidate);
      socket.on('return_stop',handleResultsStop)
    }

    // Cleanup ao desmontar
    return () => {
      if (eventsRegistered.current) {
        eventsRegistered.current = false;
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
        socket.off('create_lobby', handleCreateLobby);
        socket.off('enter_lobby', handleEnterLobby);
        socket.off('validate_responses', handleValidate);
        socket.off('return_stop',handleResultsStop)
      }
    };
  }, []);


  // Funções para emitir eventos do WebSocket
  const sendMessage = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const handleCreateRoom = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const validateStop = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const handleReturnStop = async (event, data) => {
    if (socket) {
      try {
        socket.emit(event, data, () => {
          navigate('/results');
        });
      } catch (error) {
        console.error('Erro no evento:', error);
      }
    }
  };

  const handleEnterRoom = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const handleTriggerStop = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const handleReceiveStop = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  // Retornar socket e funções relacionadas
  return {
    socket,
    isConnected,
    roomCode,
    themes,
    sendMessage,
    validateStop,
    handleReturnStop,
    handleCreateRoom,
    handleReceiveStop,
    handleEnterRoom,
    handleTriggerStop,
    roundTime,
    isInLobby,
  };
};

export default WebSocket2;
