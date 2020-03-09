import React from 'react';
import ReactGoogleSlides from 'react-google-slides';
import {SlidesContainer} from './Presentacion.styled';
import {useSpring} from "react-spring";

const Presentacion = ({tema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});

  return (
    <SlidesContainer style={props}>
        <ReactGoogleSlides width="90%"
                         height="90%" slidesLink={tema.linkDePresentacion}
                         slideDuration={20}
                         showControls/>
    </SlidesContainer>
  );
};

export default Presentacion;
