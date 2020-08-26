import React from "react";
import {HeaderContainer, Titulo} from "./Header.styled";
import Countdown from "./Countdown";
import {useSpring} from "react-spring";

const Header = ({tema, estaActivo}) => {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  });

  const segundosRestantes = () => {
    const {inicio, cantidadDeMinutosDelTema} = tema;
    const segundosDuracionEstimada = cantidadDeMinutosDelTema * 60;
    if (inicio === null) {
      return segundosDuracionEstimada;
    }
    return Math.round(segundosDuracionEstimada - segundosDuracionTotalTema())

  };

  const segundosDuracionTotalTema = () => {
    const {inicio, fin, tiempoInactivo} = tema;
    const tiempo = fin === null ? Date.now() : Date.parse(fin);
    return Math.round((tiempo - Date.parse(inicio) - (tiempoInactivo || 0)) / 1000);
  }

  const deberiaMostrarDuracionTotal = () => {
    return !estaActivo && tema.inicio;
  }

  return (
  <HeaderContainer style={props}>
    <Titulo>{tema.titulo}</Titulo>
    <Countdown activo={estaActivo}
               segundos={ deberiaMostrarDuracionTotal() ? segundosDuracionTotalTema()  : segundosRestantes()}
               opacity={deberiaMostrarDuracionTotal() ? 1 : 0.5}/>
  </HeaderContainer>
  )};

export default Header;
