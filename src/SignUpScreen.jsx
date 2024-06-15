import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
            alert('Usuario já cadastrado ou email invalido!')
            console.log(err.response.data)})
    }

    // renderiza a tela e recebe os dados para o cadastro
    return (

    <Container>
        <Titulo> TrackIt </Titulo>

        <Form>
        <Inputs type="email" placeholder="email"
        value={email} onChange={e => setEmail(e.target.value)}/>
        <Inputs type="password" placeholder="senha"
        value={senha} onChange={e => setSenha(e.target.value)} />
        <Inputs type="text" placeholder="nome"
        value={nome} onChange={e => setNome(e.target.value)} />
        <Inputs type="url" placeholder="foto"
        value={imagem} onChange={e => setImagem(e.target.value)} />
        </Form>

        <Enviar onClick={Cadastro}> Entrar </Enviar>

        <Login to={'/'}> Já tem uma conta? Faça login! </Login>
    </Container>
    );
}

const Titulo = styled.div`
    font-family: "Playball", cursive;
    font-size: 80px;
    color: #126BA5;
`

const Container = styled.div`
    background-color: #ffffff;
    margin-top: 20px;
    align-items: center;
    display: block;
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
    margin-top: 30px;
    margin-bottom: 20px;
    background-color: #52B6FF;
    border-color: #52B6FF;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const Form = styled.div`
    display: grid;
    flex-wrap: wrap;
    gap: 20px;
`

const Login = styled(Link)`
    color: #126BA5;
    text-decoration: none;
`