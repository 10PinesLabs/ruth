import styled from 'styled-components';
import { animated } from 'react-spring';
import { font } from '../../styles/theme';

export const DescripcionTemaContainer = styled(animated.div)`
  display: flex;
  flex: 1;
  flex-direction:column;
  align-items: center;
  overflow-y: auto;
`;

export const Descripcion = styled.div`
  display: block;
  font-family: ${font.p};
  font-size:  ${font.sizeP};
  white-space: pre-line;
  text-align: justify;
  margin: 0 3em;
`;

export const ListaTemasARepasar = styled.ul`
`;

export const ListaPinosPropuestos = styled.ul`
`;
