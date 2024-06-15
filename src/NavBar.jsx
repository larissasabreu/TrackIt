import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export default function NavBar() {
    const dadosUsuario = useContext(UserContext);
    const pfp = dadosUsuario.image;

    // Logo e a foto de perfil do usuário fixos
    return (
        <Header>
            TrackIt
            <Imagem src={pfp} />
        </Header>
    ); 
}

const Header = styled.div`
    font-family: "Playball", cursive;
    font-size: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    top: 0;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    color: white;
`
const Imagem = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 98.5px;
`