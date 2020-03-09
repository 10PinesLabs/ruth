import React from "react";
import {HeaderContainer, Titulo} from "./Header.styled";
import Countdown from "./Countdown";

const Header = ({segundosRestantes, titulo, temaActivo}) => {
  return <HeaderContainer>
    <Titulo>{titulo}</Titulo>
    <Countdown activo={temaActivo}
               segundos={segundosRestantes}/>
  </HeaderContainer>
};

export default Header;
