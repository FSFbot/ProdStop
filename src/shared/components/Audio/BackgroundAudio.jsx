import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const BackgroundAudio = ({ audioSrc }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Tenta tocar o áudio automaticamente
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        console.log("Áudio está tocando automaticamente!");
      } catch (error) {
        console.error("Navegador bloqueou a reprodução automática:", error);
        // Aqui você pode lidar com o erro, como exibir uma notificação
      }
    };

    if (audioSrc) {
      playAudio();
    }
  }, [audioSrc]); // Reexecuta se o audioSrc mudar

  return (
    <audio ref={audioRef} loop>
      <source src={audioSrc} type="audio/mpeg" />
      Seu navegador não suporta o elemento de áudio.
    </audio>
  );
};

// Validação de props
BackgroundAudio.propTypes = {
  audioSrc: PropTypes.string.isRequired, // Caminho para o arquivo de áudio
};

export default BackgroundAudio;