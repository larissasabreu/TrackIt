import styled from "styled-components";
import './assets/bg.css'
import NavBar from './NavBar';
import Barra from './Barra';
import AdicionandoHabito from "./AdicionandoHabito";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';


export default function MeusHabitos({ token }) {
    const [abrir, setAbrir] = useState(false);
    const [habitos, setHabitos] = useState(null);

    useEffect(() => {
        if (!token) {
            useNavigate('/');
        }
    })

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    // Pega a listagem de habitos do usuário
    useEffect(() => {
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config)
            .then(res => setHabitos(res.data))
            .catch(err => console.log(err.response.data))
    }, [habitos])

    if (habitos == null) {
        return (
        <div> <ThreeDots color="blue"/> </div>
        );
    }

    // abre a caixa de AdicionarHabito
    function AddBox() {
        setAbrir(true);
    }

    // renderiza a página e passa a listagem de habitos
    return (
        <Tela>
            <NavBar />

            <Container> Meus hábitos <Add onClick={AddBox}> <AddBoxIcon fontSize='large'/> </Add> 
            </Container>

            <Caixa>
            {abrir && <AdicionandoHabito token={token} abrir={abrir} setAbrir={setAbrir}/>}
            </Caixa>

            <Feed>
            {habitos.map((h) => (<ListaHab name={h.name} days={h.days}/>))}
            </Feed>
            <Alerta habitos={habitos}/>


            <Barra/>
            
        </Tela>
    );
}

function Alerta (props) {
    // Mensagem default pra caso não tiver habitos registrados
    if (props.habitos == '') {
        return (
            <Texto> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear! </Texto>
        );
    } else (
        <div> teste </div>
    );
}

function ListaHab (props) {
    const diasTexto = [
        {nome: 'Dom'},
        {nome: 'Seg'},
        {nome: 'Ter'},
        {nome: 'Qar'},
        {nome: 'Qui'},
        {nome: 'Sex'},
        {nome: 'Sab'}
    ];

    // renderiza a caixa e manda o map dos dias
    return (
        <Habit> 
            
            <Texto> {props.name} </Texto>

            <Dias>
            {diasTexto.map((d, index) => (<Selecao key={index} ind={index} days={props.days} 
            nomes={d.nome}/>))}
            </Dias>
            
        </Habit>
    );
    
}

function Selecao (props) {
    const selecionado = true;
    const naoSelecionado = false;
    const daysNome = props.days;

    // renderiza e colore os dias de cada habito listado de acordo se
    // o dia foi selecionado para aquele habito ou não pelos dados recebidos
    if (daysNome.includes(props.ind)) {
        return (
        <DiaSelecionado selecionado={selecionado}> {props.nomes} </DiaSelecionado>
        );
    } else {
        return (
        <DiaSelecionado selecionado={naoSelecionado}> {props.nomes} </DiaSelecionado>
        );
    }

}

const Tela = styled.div`
    height: 100%;
    width: 100%;
    background-color: #f2f2f2;
`

const Container = styled.div`
    margin-top: 80px;
    color: #126BA5;
    font-size: 30px;
    font-weight: 400;
    line-height: 28.72px;
    display: flex;
    justify-content: center;
`

const Add = styled.div`
    color: #126BA5;
    cursor: pointer;
    font-size: 40px;
`
const Texto = styled.h1`
    font-weight: bold;
    color: #666666;
    margin-bottom: 20px;
    font-size: 20px;
`
const Habit = styled.div`
    width: 340px;
    height: 94px;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-color: white;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 90px;
`

const Dias = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const DiaSelecionado = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D4D4D4;
    background-color: ${props => props.selecionado == true ? '#D4D4D4' : ' #FFFFFF'};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.selecionado == true ? '#FFFFFF' : ' #D4D4D4'};
`

const Feed = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
`
const Caixa = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`