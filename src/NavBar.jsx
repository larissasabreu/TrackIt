import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function NavBar() {
    const dadosUsuario = useContext(UserContext);
    const pfp = dadosUsuario.image;
    const nome = dadosUsuario.name;
    console.log(dadosUsuario);

    // Logo e a foto de perfil do usuário fixos


    return (
        <Header>
            
            {/* options switch para deslogar placeholder*/}
            <BackButton to='/'>

            <MoreHorizIcon fontSize='50px'/>

            </BackButton>

            TrackIt
            <User>
            <Imagem src={pfp}/>
            <UserName>
            Olá, {nome}!
            </UserName>
            </User>

        </Header>
    ); 
}

const BackButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #f9d62e;

`

const Header = styled.div`
    font-family: "Playwrite IE", cursive;
    font-size: 30px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    top: 0;
    width: 100%;
    height: 70px;
    background-color: #304280;
    color: #f9d62e;
`

const Imagem = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 98.5px;
    border: 3px solid #f9d62e;
`
const UserName = styled.h1`
    color: white;
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
`
const User = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
`