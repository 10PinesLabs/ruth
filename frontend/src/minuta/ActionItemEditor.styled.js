import React from "react"
import styled from 'styled-components';
import {Button, Container, makeStyles, TextField} from '@material-ui/core';
import {colors} from '../styles/theme';

export const ContenedorEdicionActionItem = styled(Container)`
  background-color: #C7F0E6;
  display: flex;
  flex-direction: column;
`;

const boton = (theme) => ({
    fontFamily: 'Poppins',
    fontWeight: "bold",
    margin: `${theme.spacing(1.5)}px 0px ${theme.spacing(1.5)}px 0px`,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
});

const useStylesBotones = makeStyles(theme => ({
  boton: {
    ...boton(theme)
  },
  botonEnviar: {
    ...boton(theme),
    backgroundColor: colors.primary,
    color: colors.white
  }
}));

export function BotonCancelar(props) {
  const classes = useStylesBotones();
  return <Button {...props} className={classes.boton}>{props.children}</Button>;
}

export function BotonEnviar(props) {
  const classes = useStylesBotones();
  return <Button {...props} className={classes.botonEnviar}>{props.children}</Button>;
}

const useStylesContenedorActionItems = makeStyles(theme => ({
  root: {
    backgroundColor: colors.white,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column"
  }
}));


export function ContenedorInputActionItem(props) {
  const classes = useStylesContenedorActionItems();
  return <Container {...props} className={classes.root}>{props.children}</Container>;
}

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
