import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const navigate = useNavigate();
    const req = {
        email: email,
        name: nome,
        image: imagem,
        password: senha
    }
    console.log(req);

    // efetua o cadastro ou retorna erro
    function Cadastro(e) {
        e.preventDefault();
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', req)
        .then(() => navigate("/"))
        .catch(err => {
            alert('Usuario já cadastrado ou dados invalidos!')
            console.log(err.response.data)})
    }

    // renderiza a tela e recebe os dados para o cadastro
    return (

    <Container>
        <Titulo> TrackIt <CalendarMonthIcon fontSize="50px"/> </Titulo>

        <Form>
        <Inputs type="email" placeholder="email"
        value={email} onChange={e => setEmail(e.target.value)}/>
        <Inputs type="password" placeholder="senha"
        value={senha} onChange={e => setSenha(e.target.value)} />
        <Inputs type="text" placeholder="nome"
        value={nome} onChange={e => setNome(e.target.value)} />
        <Mensagem> Use uma URL para sua imagem de perfil! </Mensagem>
        <Inputs type="url" placeholder="foto"
        value={imagem} onChange={e => setImagem(e.target.value)} />
        </Form>

        <Enviar onClick={Cadastro}> CADASTRAR </Enviar>

        <Login to={'/'}> Já tem uma conta? Faça login! </Login>
    </Container>
    );
}

const Titulo = styled.div`
    font-family: "Playwrite IE", cursive;
    font-size: 60px;
    color: 	#f9d62e;
    margin-top: 20px;
`

const Mensagem = styled.p`
    color: #126BA5;
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
`

const Container = styled.div`
    background-color: #232331 ;
    height: 100%;
    width: 100%;
    align-items: center;
    display: grid;
    justify-content: center;
    flex-wrap: wrap;
    Gap: 30px;
`
const Inputs = styled.input`
    width: 303px;
    height: 45px;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid #D4D4D4
`

const Enviar = styled.div`
    width: 303px;
    height: 45px;
    background-color: #52B6FF;
    font-weight: bold;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Form = styled.div`
    display: grid;
    flex-wrap: wrap;
    gap: 2px;
`

const Login = styled(Link)`
    color: #126BA5;
    text-decoration: none;
`