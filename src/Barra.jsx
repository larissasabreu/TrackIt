import { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function Barra () {
    const [dMeusHabitos, setdMeusHabitos] = useState(true);
    const [dHoje, setdHoje] = useState(false);
    const pagina = useParams(); 
    console.log(pagina);

    // mudam a cor do switch correspondente a página
    function SelecHabitos () {
        setdMeusHabitos(true);
        setdHoje(false);
    }
    function SelecHoje() {
        setdMeusHabitos(false);
        setdHoje(true);
    }

    // renderiza o switch fixo e linka para suas respectivas páginas
    return (
        <Switch>

        <SwitchHabitos to='/MeusHabitos' onClick={SelecHabitos} selecionado={dMeusHabitos} > 
        <CalendarMonthIcon/> Habitos 
        </SwitchHabitos>

        <SwitchHoje to='/Hoje' onClick={SelecHoje}
        selecionado={dHoje}> 
        <CalendarTodayIcon/> Hoje </SwitchHoje>

        </Switch>
    );
    
}

const Switch = styled.div`
    position: fixed;
    display: flex;
    height: 65px;
    width: 100%;
    background-color: blue;
    bottom: 0;
`
const SwitchHabitos = styled(Link)`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    color: ${props => props.selecionado == false ?  '#D4D4D4;' : '#FFFFFF;' };
    background-color: ${props => props.selecionado == false ?  '#43435e;' : '#52B6FF;' };
    text-decoration: none;
    cursor: pointer;
`

const SwitchHoje = styled(Link)`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.selecionado == false ?  '#D4D4D4;' : '#FFFFFF;' };
    background-color: ${props => props.selecionado == false ?  '#43435e;' : '#52B6FF;' };
`