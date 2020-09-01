import React from "react";
import {Botonera, Descripcion, Imagen, PageContainer, Parrafo, Titulo} from "./CommonPages.styled";
import {Button, SecondaryButton} from "../components/Button.styled";
import {useSpring} from "react-spring";
import {withRouter} from 'react-router-dom'

const NotFound = ({history}) => {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <PageContainer style={props}>
      <Imagen src={'./404.png'}/>
      <Titulo> Whoops! </Titulo>
      <Descripcion>
        <Parrafo>
          Parece que la pagina que estas buscando ya no existe o no esta disponible por ahora.
        </Parrafo>
        <Parrafo> Dejanos ayudarte, elige a donde quieres ir: </Parrafo>
      </Descripcion>
      <Botonera>
        <Button onClick={() => history.push('/')}> Modo espectador </Button>
        <SecondaryButton onClick={() => history.push('/presentador')}> Modo presentacion </SecondaryButton>
      </Botonera>
    </PageContainer>
  );
};

export default withRouter(NotFound);
