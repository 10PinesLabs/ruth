import React from "react";
import {Botonera, Descripcion, Imagen, NotFoundContainer, Parrafo, Titulo} from "./NotFound.styled";
import {Button, SecondaryButton} from "../components/Button.styled";
import {useSpring} from "react-spring";

const NotFound = () => {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <NotFoundContainer style={props}>
      <Imagen src={'./404.png'}/>
      <Titulo> Whoops! </Titulo>
      <Descripcion>
        <Parrafo>
          Parece que la pagina que estas buscando ya no existe o no esta disponible por ahora.
        </Parrafo>
        <Parrafo> Dejanos ayudarte, elige a donde quieres ir: </Parrafo>
      </Descripcion>
      <Botonera>
        <Button onClick={}> Modo espectador </Button>
        <SecondaryButton onClick={}> Modo presentacion </SecondaryButton>
      </Botonera>
    </NotFoundContainer>
  );
};

export default NotFound;
