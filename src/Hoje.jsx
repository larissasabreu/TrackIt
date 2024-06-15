import styled from "styled-components";
import NavBar from "./NavBar";
import Barra from "./Barra";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

export default function Hoje({ token }) {
    const [habitos, setHabitos] = useState(null);
    
    // Display do dia atual
    dayjs.extend(updateLocale);
    dayjs.extend(weekday);
    dayjs.updateLocale('en', {
    weekdays: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"
    ]
    })
    const diaHoje = dayjs().format("dddd, DD/MM");;

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

    // pega a listagem de habitos de acordo com o dia de hoje
    useEffect(() => {
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config)
            .then(res => setHabitos(res.data))
            .catch(err => console.log(err.response.data))
    }, [habitos])

    if (habitos == null) {
        return (
        <div> <ThreeDots color="blue"/> </div>
        );
    }

    // renderiza a página e a listagem de habitos de hoje
    return (
        <Tela>
            <NavBar />
            <div>
            <Container> {diaHoje} </Container>

            {habitos.map((h) => <Listagem key={h.id} name={h.name} currentSequence={h.currentSequence} 
            highestSequence={h.highestSequence} done={h.done} id={h.id} token={token}/>)}
            </div>
            <Barra/>
        </Tela>
    );
}

function Listagem(props) {
    const [selec, setSelec] = useState(props.done);
    const [contagem, setContagem] = useState(props.currentSequence);
    const [maiorContagem, setMaiorContagem] = useState(props.highestSequence);

    const token = props.token;
    const id = props.id;


    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const body = '';

    // manda se a tarefa foi marcada como concluida ou não e aumenta a contagem
    function Concluir () {
        if (selec == false) {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config)
            .then(res => {setSelec(true)
            setContagem(props.currentSequence + 1)
            setMaiorContagem(props.highestSequence + 1)
            console.log(res)})
            .catch(err => console.log(err.response))

        } else if (selec == true) {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config)
            .then(res => {setSelec(false)
            setContagem(props.currentSequence - 1)
            setMaiorContagem(props.highestSequence - 1)
            console.log(res)})
            .catch(err => console.log(err.response))
        }
    }

    // renderiza a caixa
    return (
        <Habitos>
        <div>
        <Titulo> {props.name} </Titulo>
        <Descricao> Sequência atual: {contagem} dias </Descricao>
        <Descricao> Maior sequência: {maiorContagem} dias </Descricao>

        </div>
        <Checkmark onClick={Concluir} selecionado={selec}> 
        <CheckBoxIcon fontSize='large'/> </Checkmark>
        </Habitos>
    );
}

const Tela = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #f2f2f2;
    display: grid;
    flex-wrap: wrap;
    justify-content: center;
`

const Container = styled.div`
    margin-top: 90px;
    color: #126BA5;
    font-size: 30px;
    font-weight: 400;
    line-height: 28.72px;
`
const Habitos = styled.div`
    width: 340px;
    height: 94px;
    margin-top: 20px;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-color: white;
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: center;
`

const Titulo = styled.h1`
    font-weight: bold;
`

const Descricao = styled.h2`
    font-weight: 400;
`

const Checkmark = styled.div`
    color: ${props => props.selecionado == false ? '#D4D4D4;' :  'limegreen;'};
    cursor: pointer;
`