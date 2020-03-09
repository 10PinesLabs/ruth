import React from "react";
import {HeaderContainer, Titulo} from "./Header.styled";
import Countdown from "./Countdown";
import {useSpring} from "react-spring";

const Header = ({segundosRestantes, titulo, temaActivo}) => {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  });

  return (
  <HeaderContainer style={props}>
    <Titulo>{titulo}</Titulo>
    <Countdown activo={temaActivo}
               segundos={segundosRestantes}/>
  </HeaderContainer>
  )};

export default Header;
