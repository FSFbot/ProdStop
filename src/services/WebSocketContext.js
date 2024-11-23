// src/contexts/WebSocketContext.js
import React, { createContext, useContext } from 'react';
import WebSocket2 from '../services/WebSocket.js'; // sua função de WebSocket

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const websocket = WebSocket2(); // Inicializando sua lógica do WebSocket

  return (
    <WebSocketContext.Provider value={websocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
