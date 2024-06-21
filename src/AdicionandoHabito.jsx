import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

export default function AdicionandoHabito(props) {
    const [salvarDia, setSalvarDia] = useState([]);
    const [nome, setNome] = useState('');
    const token = props.token;
    const diasTexto = [
        {nome: 'D'},
        {nome: 'S'},
        {nome: 'T'},
        {nome: 'Q'},
        {nome: 'Q'},
        {nome: 'S'},
        {nome: 'S'}
    ];

    const req = {
        name: nome,
        days: salvarDia
    }
    console.log(req);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    //fecha a caixa ao clicar 'Cancelar' 
    function FecharBox() {
        props.setAbrir(false)
    }

    // Manda os dados do novo hábito ou retorna erro em dados invalidos
    function criarHabito() {
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', req, config)
        .then(res => {console.log(res)
            props.setAbrir(false)
        })
        .catch(err => {console.log(err.response)
        alert('Habito não registrado, tente novamente!')})
    }

    // Renderiza a caixa e recebe os dados do novo hábito e manda o array de dias
    // para renderizar
    return (
        <AdicionarHabito> <AdicionarNome type='text' placeholder='nome do habito'
        value={nome} onChange={e => setNome(e.target.value)}/> 

        <Dias>
        {diasTexto.map((dias) => <EscolhaDias key={dias.nome} diasTexto={diasTexto} diasNome={dias.nome}
        diasNumero={dias.dia} salvarDia={salvarDia} setSalvarDia={setSalvarDia}/> )}
        </Dias>

        <Opt>
        <Cancelar onClick={FecharBox}> Cancelar </Cancelar>
        <BotaoSalvar onClick={criarHabito}> Salvar </BotaoSalvar> 
        </Opt>
        </AdicionarHabito> 
    );
}

function EscolhaDias (props) {
    const [escolhaDia, setEscolhaDia] = useState(false);
    const salvarDia = props.salvarDia;
    const diasE = props.diasNome;

    // recebe a informação de qual dia foi escolhido para aquele hábito e muda a cor
    function SelecDia( dia ) {
        if (escolhaDia == false) { 
            setEscolhaDia(true);
            const ind = props.diasTexto.findIndex(d => d.nome == dia);
            props.setSalvarDia([...salvarDia, ind]);

        } else {
            setEscolhaDia(false);
            salvarDia.pop(dia);
        }
    }
    
    // renderiza os dias
    return (
     <Dia onClick={() => {SelecDia(diasE)}} selecionado={escolhaDia}> {diasE} </Dia> 
    );
}

// Box de Input
const AdicionarHabito = styled.div`
    width: 340px;
    height: 180px;
    background-color: #58587c;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
    border-radius: 5px;
    margin-top: 20px;   
    margin-bottom: 20px;
`

const AdicionarNome = styled.input`
    width: 303px;
    height: 45px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
`

const BotaoSalvar = styled.button`
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 5px;
    color: white;
    border: #52B6FF;
    cursor: pointer;
`

const Opt = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
`
const Dias = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const Dia = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D4D4D4;
    background-color: ${props => props.selecionado == false ? '#38384f;' :  ' #f9d62e;'};
    border-radius: 5px;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${props => props.selecionado == false ? '#D4D4D4;' : 'black;' };
`
const Cancelar = styled.p`   
    color: #52B6FF;
    cursor: pointer;
`