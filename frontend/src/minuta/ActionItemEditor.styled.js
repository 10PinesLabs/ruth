import React from "react"
import styled from 'styled-components';
import {Button, Container, makeStyles, TextField} from '@material-ui/core';
import { colors } from '../styles/theme';

export const ContenedorEdicionActionItem = styled(Container)`
  background-color: #C7F0E6;
  display: flex;
  flex-direction: column;
`;

const margenBoton = `
    margin: 1vw 0vw 1vw 0vw;
`

export const BotonCancelar = styled(Button)`
  && {
    ${margenBoton}
  };
`;
export const BotonCrearActionItem = styled(Button)`
  && {
    background-color: ${colors.primary}
    ${margenBoton}
    color: ${colors.white}
  };
  
`;
export const ContenedorInputActionItem = styled(Container)`
  background-color: ${colors.white};
  padding: 1vw;
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
`;

export const InputActionItem = (props) => {

  const useStyles = makeStyles(() => ({
    root: {
      '& label.Mui-focused':{
        color: colors.primary,
      },
      '& .MuiInput-underline::after': {
        borderBottomColor: colors.primary,
      },
    }
  }),
  );

  return (
    <TextField classes={useStyles()} {...props}/>
  );
};

export const ContenedorBotonesActionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
