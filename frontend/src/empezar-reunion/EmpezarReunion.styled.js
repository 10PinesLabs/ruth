import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import { Button, SecondaryButton } from '../components/Button.styled';
import { font } from '../styles/theme';

export const BotonesContainer = styled.div`
  margin-bottom: 3rem;
`;
export const TextContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TextContainerModalReenviarMail = styled.div`
  padding: 0px;
  margin: 0 2.5% 2.5%;
`;

export const EmpezarReunionButton = styled(Button)`
  margin: 1em 0;
`;

export const ReunionesActivasContainer = styled.div`
  width: 70%;
  padding: 2em; 
  background-color: white;
  border-radius: 30px;
  margin: 1em;
`;

export const ReunionesActivasTitle = styled(Tab)`
  > span{
    font-size: large;
    font-family: ${font.h1};
  }
`;

export const ReunionesWrapper = styled.span`
  height: 95%;
  overflow-y: scroll;
`;

export const EmpezarRootsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const HomeImage = styled.img`
  max-width: 20rem;
  width: 100%;
  margin: 0 4rem;
`;


export const BotonDeCreacionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const CancelButton = styled(SecondaryButton)`
    margin-right: 5px;
    padding: 0.5em 1em
`;

export const CrearButton = styled(Button)`
    padding: 0.5em 1em
`;

export const FormContainer = styled.div`
    border-radius: 10px;
    background: whitesmoke;
    padding: 1em;
`;

export const TitleAndButton = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

export const ReunionesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #68c9b2
`;

export const EmpezarReunionContainer = styled.div`
  width: 27%;
  display: flex;
  justify-content: flex-start; 
  flex-direction: column;
  padding: 1em;
`;

export const RuthTitle = styled.b`
  font-style: italic;
  color: white;
`;

export const Title = styled.h1`
  font-size: ${font.sizeH1} ;
  font-family: ${font.h1};
  text-align: center;
  max-width: 10em;
`;

export const InputEmailReenviarMinuta = styled(TextField)`
  border: 0;
  margin: 0;
  padding: 0px;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
  align-self: center;
  width: 250px;
`;

export const ParrafoMail = styled.span`
  margin: 0 2.5% 2.5%;
  color: red;
`;
