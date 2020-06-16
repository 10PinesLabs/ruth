import styled from 'styled-components';
import { Button, Container, TextField } from '@material-ui/core';
import { colors } from '../styles/theme';

export const ContenedorEdicionActionItem = styled(Container)`
  background-color: ${colors.black10};
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
export const InputActionItem = styled(TextField)`
  & label.Mui-focused{
    border-bottom-color: red;
    color: ${colors.primary};
  };
`;
export const ContenedorBotonesActionItem = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
