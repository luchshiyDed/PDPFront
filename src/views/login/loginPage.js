import {React,useState} from 'react';

import { redirect } from "react-router-dom";
import './Login.css';
const fetchAddr=process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_PORT+"/auth"


const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("http://"+fetchAddr+"/authenticate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: login, password }),
      });
      
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("JWT",token);
      localStorage.setItem("role",data.role);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;