import React from "react";
import {Botonera, Descripcion, Imagen, PageContainer, Parrafo, Titulo} from "./CommonPages.styled";
import {Button, SecondaryButton} from "../components/Button.styled";
import {useSpring} from "react-spring";

const NotFound = ({history}) => {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <PageContainer style={props}>
      <Imagen src={'./404.png'}/>
      <Titulo> Ups! </Titulo>
      <Descripcion>
        <Parrafo>
          La página que estás buscando no existe o no está disponible.
        </Parrafo>
        <Parrafo> Podés entrar a: </Parrafo>
      </Descripcion>
      <Botonera>
        <Button onClick={() => history.push('/')}> Modo espectador </Button>
        <SecondaryButton onClick={() => history.push('/presentador')}> Modo presentador </SecondaryButton>
      </Botonera>
    </PageContainer>
  );
};

export default NotFound;
