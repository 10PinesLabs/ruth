import Collapse from '@material-ui/core/Collapse';
import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
width:60%`

const InputResumen = ({ oradores, isRecapVisible, children}) => {

  const selected = () => (oradores.actual
    ? oradores.actual.usuario.nombre
    : oradores.pasados[oradores.pasados.length - 1].usuario.nombre);

  const shouldBeDisabled = () => !(oradores.actual || oradores.pasados.length > 0);

  return (
    <>
    <Container>
        <Collapse in={isRecapVisible}>
          {children}
        </Collapse>
      </Container>
    </>);
};

export default InputResumen;
