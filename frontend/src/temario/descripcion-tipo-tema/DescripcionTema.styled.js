import styled from 'styled-components';
import {animated} from 'react-spring';

export const DescripcionTemaContainer = styled(animated.div)`
  display: flex;
  flex: 1;
  flex-direction:column;
  align-items: center;
  overflow-y: auto;
`;

export const Descripcion = styled.div`
  display: block;
  font-family: ${({theme}) => theme.font.p};
  font-size:  ${({theme}) => theme.font.sizeP};
  color: ${({theme}) => theme.colors.text};
  white-space: pre-line;
  text-align: justify;
  margin: 0 3em;
`;

export const ListaTemasARepasar = styled.ul`
`;

export const ListaPinosPropuestos = styled.ul`
`;
