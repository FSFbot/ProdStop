// src/pages/Register/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../services/Requests';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField, Button, Box, IconButton, Divider } from '@mui/material';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal.jsx';
import './Register.css'; // Importar o CSS

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const regirterNewPlayer = async () => {
    try {
      const newPlayer = {
        username: userName,
        email: email,
        image: "",
        id_type_role: 1,
        password: password
      };

      const response = await registerRequest(newPlayer);

      console.log(response);

      if (!response.sucess) {
        setModalOpen(true);
        setErrorMessage(response.status);
      }
    } catch (error) {
      console.log(error.request.response);
      setModalOpen(true);
      setErrorMessage(error.request.response);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--primary-color)',
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 3,
          borderRadius: 4,
          backgroundColor: 'var(--secundary-color)',
          position: 'relative',
          border: '10px solid var(--primary-color)',
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
        }}
      >
        {/* Ícone de voltar */}
        <IconButton
          onClick={() => navigate('/')}
          sx={{ position: 'absolute', left: 8, top: 8, color: 'var(--primary-color)' }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Título */}
        <Box sx={{ textAlign: 'center', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '24px', marginBottom: 2 }}>
          CADASTRO
        </Box>

        {/* Botão Google */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#fff',
            color: 'var(--primary-color)',
            marginBottom: 2,
            fontWeight: 'bold',
          }}
        >
          CONTINUAR COM GOOGLE
        </Button>

        {/* Linha divisória */}
        <Divider sx={{ marginBottom: 2 }}>
          <Box sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>OU</Box>
        </Divider>

        {/* Formulário de cadastro */}
        <TextField
          label="Nome"
          placeholder="Insira seu nome aqui."
          value={userName}
          fullWidth
          margin="dense"
          onChange={(e) => setUserName(e.target.value)}
          sx={{ marginBottom: 2 }}
          slotProps={{
            input: {
              style: { color: 'white' },
              className: 'white-placeholder',
            },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <TextField
          label="E-mail"
          placeholder="Insira seu e-mail aqui."
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          margin="dense"
          sx={{ marginBottom: 2 }}
          slotProps={{
            input: {
              style: { color: 'white' },
              className: 'white-placeholder',
            },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <TextField
          label="Senha"
          type="password"
          placeholder="Insira sua senha aqui."
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
          sx={{ marginBottom: 2 }}
          slotProps={{
            input: {
              style: { color: 'white' },
              className: 'white-placeholder',
            },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          placeholder="Insira sua senha novamente."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="dense"
          sx={{ marginBottom: 2 }}
          slotProps={{
            input: {
              style: { color: 'white' },
              className: 'white-placeholder',
            },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />

        {/* Botão Cadastrar */}
        <Button
          variant="contained"
          onClick={regirterNewPlayer}
          fullWidth
          sx={{
            backgroundColor: 'var(--primary-color)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: 2,
          }}
        >
          CADASTRAR
        </Button>
      </Box>
      <ErrorModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        errorMessage={errorMessage}
      />
    </Box>
  );
}