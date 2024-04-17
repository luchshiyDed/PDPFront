import axios from 'axios';

const api = axios.create({
  baseURL:'http://'+ process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('JWT');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type']='application/json';
  config.headers['accept']='application/json';

  return config;
});

export default api;