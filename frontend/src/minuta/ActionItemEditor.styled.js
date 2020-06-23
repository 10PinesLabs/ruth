import React from "react"
import styled from 'styled-components';
import {Button, Container, makeStyles, TextField} from '@material-ui/core';
import { colors } from '../styles/theme';

export const ContenedorEdicionActionItem = styled(Container)`
  background-color: #C7F0E6;
  display: flex;
  flex-direction: column;
`;
export const BotonCancelar = styled(Button)`
  && {
    margin: 1vw;
  };
`;
export const BotonCrearActionItem = styled(Button)`
  && {
    background-color: ${colors.primary}
    margin: 1vw;
    color: ${colors.white}
  };
  
`;
export const ContenedorInputActionItem = styled(Container)`
  background-color: ${colors.white};
  padding: 1vw;
  margin: 3vw;
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

export const ContenedorBotonesActionItem = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;