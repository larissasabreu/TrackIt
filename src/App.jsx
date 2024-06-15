import './App.css'
import './assets/reset.css';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import MeusHabitos from './MeusHabitos';
import Hoje from './Hoje';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [dadosUsuario, setDadosUsuario] = useState(localStorage.getItem('dadosUsuario'));
  console.log(dadosUsuario);

  return (
    <UserContext.Provider value={dadosUsuario}>
    <BrowserRouter>
      <Tela>
      <Routes>

        <Route path="/" element={<LoginScreen setToken={setToken} 
        setDadosUsuario={setDadosUsuario} />} />
        <Route path="/cadastro" element={<SignUpScreen/>} />

        <Route path="/MeusHabitos" element={<MeusHabitos token={token}
        />} />
        <Route path="/Hoje" element={<Hoje token={token}/>} /> 

        </Routes>

      </Tela>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

const Tela = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`