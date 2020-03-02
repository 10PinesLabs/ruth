import styled from 'styled-components';
import { font, sizeBreakpoint } from '../../styles/theme';


export const DescripcionTemaContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction:column;
  align-items: center;
  overflow-y: auto;
`;

export const Titulo = styled.h1`
  font-size: ${font.sizeH1} ;
  font-family: ${font.h1};
`;

export const Descripcion = styled.div`
  display: block;
  font-family: ${font.p};
  font-size:  ${font.sizeP};
  @media (min-width: ${sizeBreakpoint.bigWidth}), @media (min-height: ${sizeBreakpoint.bigHeight})  {
    font-size: 2rem;
  }
  white-space: pre-line;
  text-align: justify;
  margin: 0 3em;
  width: 100%;
  margin-top: 3em;
`;

export const ListaTemasARepasar = styled.ul`
`;

export const ListaPinosPropuestos = styled.ul`
`;
