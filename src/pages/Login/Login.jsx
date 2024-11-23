import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Divider,
  DialogContentText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginRequest, getUserById } from '../../services/Requests.js';
import './Login.css';
import ModalGenenric from '../../shared/components/ModalGeneric/ModalGeneric.jsx';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal.jsx';
import UseAnimationToggle from '../../animations/animation.jsx'
import CardGeneric from '../../shared/components/CardGeneric/CardGeneric.jsx';
import "./Login.css"
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input-MuiOutlinedInput-input": {
      backgroundColor: "#FFFFFF"

    }
  }
}));

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // Estado para controlar o Dialog
  const [forgotEmail, setForgotEmail] = useState(''); // Estado para o e-mail de recuperação
  const [showChangePassword, setShowChangePassword] = useState(false); // Estado para alternar entre telas
  const [newPassword, setNewPassword] = useState(''); // Estado para nova senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar a nova senha
  const [forgotPasswordError, setForgotPasswordError] = useState(''); // Estado para erros no esqueci a senha
  const [passwordError, setPasswordError] = useState(''); // Estado para erros de senha
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [animationsPaused, setAnimationsPaused] = useState(true);

  const handleLogin = async () => {
    try {
      const credentials = { login: email, password };
      const response = await loginRequest(credentials);

      if (!response.success) {
        const userInfo = await getUserById(response.id_user, response.access_token)

        localStorage.setItem('userInfo', JSON.stringify({
          id: response.id_user,
          email: userInfo.user.email,
          id_type_role: userInfo.user.id_type_role,
          image: userInfo.user.image,
          themes: userInfo.user.themes,
          username: userInfo.user.username,
          token: response.access_token,
          host: false
        }));
        // Redirecionar ou fazer algo após o login




        navigate('/profile');

      }
      // Armazena o token no localStorage




    } catch (error) {
      console.log(error)
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      setModalOpen(true);
    }
  };

  const handleForgotPassword = () => {
    setOpen(true); // Abrir o Dialog
    setShowChangePassword(false); // Inicialmente mostrar recuperação de senha
  };

  const handleBack = () => {
    navigate("/")
  }
  const handleClose = () => {
    setOpen(false); // Fechar o Dialog
    setForgotPasswordError('');
    setPasswordError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendRecoveryEmail = () => {
    if (!forgotEmail) {
      setForgotPasswordError('O e-mail é obrigatório.');
    } else if (!validateEmail(forgotEmail)) {
      setForgotPasswordError('Por favor, insira um e-mail válido.');
    } else {
      console.log('Enviar e-mail de recuperação para:', forgotEmail);
      setShowChangePassword(true); // Mostra a tela de alteração de senha
      setForgotPasswordError('');
    }
  };

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError('Ambos os campos de senha são obrigatórios.');
    } else if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
    } else {
      console.log('Senha alterada para:', newPassword);
      setPasswordError('');
      setOpen(false); // Fechar o Dialog após alterar a senha
      navigate('/profile'); // Redirecionar para o perfil após alterar a senha
    }
  };

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

      }}
    >
      <CardGeneric
        handleBack={handleBack}
        backEnabled={true}
        title="LOGIN"
        children={

          <div>
            <TextField
              placeholder="Insira seu e-mail aqui."
              className={classes.root}
              fullWidth
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-input': {
                  backgroundColor: 'rgb(232, 240, 254)'
                }
              }}
            />
            <TextField
              type="password"
              placeholder="Insira sua senha aqui."
              backgroundColor="#FFFF"
              color='#FFF'
              fullWidth
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-input': {
                  backgroundColor: 'rgb(232, 240, 254)'
                }
              }}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}




            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <p>
                Esqueceu a senha?{' '}
                <Button
                  variant="text"
                  sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
                  onClick={handleForgotPassword}
                >
                  Cadastre-se
                </Button>
              </p>
            </Box>

            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <p>
                Não possui login?{' '}
                <Button
                  variant="text"
                  sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
                  onClick={() => navigate('/register')}
                >
                  Cadastre-se
                </Button>
              </p>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                backgroundColor: 'var(--third-color)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '16px',
                marginTop: 2,
              }}
            >
              ENTRAR
            </Button>

          </div>
        }

      />



      <ModalGenenric
        open={open}
        handleClose={handleClose}
        title={showChangePassword ? 'ALTERAR SENHA' : 'RECUPERAR SENHA'}
        actions={
          showChangePassword ? (
            <Button
              onClick={handlePasswordChange}
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              ALTERAR SENHA
            </Button>
          ) : (
            <Button
              onClick={handleSendRecoveryEmail}
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              ENVIAR LINK
            </Button>
          )
        }
      >
        {showChangePassword ? (
          <>
            <TextField
              type="password"
              placeholder="Insira sua nova senha aqui."
              fullWidth
              margin="dense"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, marginBottom: 2 }}
            />
            <TextField
              type="password"
              placeholder="Confirme sua nova senha aqui."
              fullWidth
              margin="dense"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, marginBottom: 2 }}
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          </>
        ) : (
          <>
            <DialogContentText sx={{ color: 'var(--primary-color)' }}>
              Insira seu e-mail para enviarmos um link de recuperação de sua senha.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              placeholder="Insira seu e-mail aqui."
              type="email"
              fullWidth
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, marginTop: 2 }}
            />
            {forgotPasswordError && <p style={{ color: 'red' }}>{forgotPasswordError}</p>}
          </>
        )}
      </ModalGenenric>

      <ErrorModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        errorMessage={errorMessage}
      />
      {/* <div className={`bg-repeat ${animationsPaused ? 'paused' : ''}`}></div>
      <div className={`bg-repeat2 ${animationsPaused ? 'paused' : ''}`}></div> */}
    </Box>
  );
}

export default Login;
