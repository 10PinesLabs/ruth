import styled from 'styled-components';
import { font } from '../styles/theme';
import {Button, SecondaryButton} from "../components/Button.styled";

export const BotonesContainer = styled.div`
  margin-bottom: 3rem;
`;
export const TextContainer = styled.div`
  margin-bottom: 2rem;
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
`;



export const TitleAndButton = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: ${font.sizeH1} ;
  font-family: ${font.h1};
  text-align: center;
  max-width: 10em;
`;
