import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const BackgroundAudio = ({ audioSrc, onAudioEnd }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Função para tocar o áudio automaticamente
  const playAudio = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      console.log("Áudio está tocando automaticamente!");
    } catch (error) {
      console.error("Navegador bloqueou a reprodução automática:", error);
      // Você pode exibir uma mensagem ou notificação ao usuário
    }
  };

  // Lidar com a interação do usuário para liberar a reprodução automática
  const handleUserInteraction = async () => {
    if (!isPlaying) {
      await playAudio();
      window.removeEventListener("click", handleUserInteraction); // Remover o evento após a interação
    }
  };

  useEffect(() => {
    // Adiciona o evento de clique para permitir a reprodução do áudio
    window.addEventListener("click", handleUserInteraction);

    return () => {
      // Limpar o evento quando o componente for desmontado
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [isPlaying]); // Reexecuta quando o estado de "isPlaying" mudar

  // Quando o áudio termina, executa a função passada como prop
  const handleAudioEnd = () => {
    if (onAudioEnd) {
      onAudioEnd(); // Chama a função de callback para mudar o áudio ou estado
    }
  };

  useEffect(() => {
    // Se o audioSrc mudar, tenta tocar o novo áudio
    if (audioSrc && !isPlaying) {
      playAudio();
    }
  }, [audioSrc, isPlaying]); // Reexecuta sempre que audioSrc ou isPlaying mudar

  return (
    <audio
      ref={audioRef}
      loop
      onEnded={handleAudioEnd} // Chamado quando o áudio terminar
    >
      <source src={audioSrc} type="audio/mpeg" />
      Seu navegador não suporta o elemento de áudio.
    </audio>
  );
};

// Validação de props
BackgroundAudio.propTypes = {
  audioSrc: PropTypes.string.isRequired, // Caminho para o arquivo de áudio
  onAudioEnd: PropTypes.func, // Função chamada quando o áudio termina
};

export default BackgroundAudio;
