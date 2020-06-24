import React from "react"
import styled from 'styled-components';
import {Button, Container, makeStyles, TextField} from '@material-ui/core';
import { colors } from '../styles/theme';

export const ContenedorEdicionActionItem = styled(Container)`
  background-color: #C7F0E6;
  display: flex;
  flex-direction: column;
`;

const estilosBotones = `
    font-family: 'Poppins',sans-serif;
    text-transform: none;
    font-weight: bold;
    margin: 1vw 0vw 1vw 0vw;
    padding: 4px 8px 4px 8px;
`

export const BotonCancelar = styled(Button)`
  && {
    ${estilosBotones}
  };
`;
export const BotonEnviar = styled(Button)`
  && {
    background-color: ${colors.primary}
    color: ${colors.white}
    ${estilosBotones}
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
