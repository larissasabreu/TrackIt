import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


export default function LoginScreen({ setToken, setDadosUsuario }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const req = {
        email: email,
        password: senha
    }

    // efetua o login, guarda os dados do usuário recebidos e o token no localstorage
    // manda para página /MeusHabitos ou retorna erro
    function login(e) {
        e.preventDefault();
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', req)
        .then(res => {
        setToken(res.data.token)
        setDadosUsuario(res.data)
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('dadosUsuario', res.data[0])
        navigate("/MeusHabitos")
        })
        .catch(err => {console.log(err.response)
        alert('Email ou senha inválidos!')
        })
    }

    // renderiza a tela de login
    return (
        <Tela>
            <Titulo> TrackIt <CalendarTodayIcon fontSize="50px"/> </Titulo>

            <Container>
            <EmailInput type="email" placeholder="email"
            value={email} onChange={e => setEmail(e.target.value)}/>
            <EmailInput type="password" placeholder="senha"
            value={senha} onChange={e => setSenha(e.target.value)} />
            </Container>

            <Enviar onClick={login}> ENTRAR </Enviar>
            <Cadastro to='/cadastro'> Não tem uma conta? Cadastre-se! </Cadastro>
        </Tela>
    );
}

const Titulo = styled.div`
    font-family: "Playwrite IE", cursive;
    font-size: 60px;
    color: 	#f9d62e;
    margin-top: 20px;
`
// #126BA5;

const Tela = styled.div`
    background-color: #232331 ;
    height: 100%;
    width: 100%;
    align-items: center;
    display: grid;
    justify-content: center;
    flex-wrap: wrap;
    Gap: 30px;
`
const EmailInput = styled.input`
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
`

const Enviar = styled(Link)`
    width: 303px;
    height: 45px;
    background-color: 	#fc913a;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
`

const Cadastro = styled(Link)`
    color: #52B6FF;
    text-decoration: none;
`
const Container = styled.div`
    display: grid;
    gap: 20px;
`