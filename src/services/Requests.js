import axios from 'axios';

const API_URL = 'https://stop-backend.up.railway.app/api';

export const loginRequest = async (credentials) => {
  return axios.post(`${API_URL}/auth`, credentials)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao fazer login:', error);
      throw error;
    });
};

export const logOut = async (token) => {
  return axios.delete(`${API_URL}/auth`, {
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao deletar token:', error);
      throw error;
    });
};


export const getUserById = async (user_id,token) => {
  return axios.get(`${API_URL}/users/${user_id}`,{
    headers: {
      'Authorization': `Bearer ${token}`, // Adicionando o token no cabeçalho
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao recuperar usuario:', error);
      throw error;
    });
};

export const registerRequest = async (requestBody) => {
  return axios.post(`${API_URL}/users`, requestBody)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao fazer login:', error);
      throw error;
    });
}

// Outras funções de serviço podem ser adicionadas aqui