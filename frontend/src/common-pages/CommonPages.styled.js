import styled from 'styled-components';
import {animated} from 'react-spring';

export const PageContainer = styled(animated.div)`
  display: flex;
  width: 100wh;
  height: 100vh;
  flex-direction: column;
  align-items: center;
`;

export const Botonera = styled.div`
  display: flex;
  flex-direction: row;
  width: 40em;
  margin: 2em;
  justify-content: space-between;
`;

export const Titulo = styled.div`
  font-size: ${({theme}) => theme.font? theme.font.sizeH1 : '1rem'}; ;
  font-family: ${({theme}) => theme.font? theme.font.h1 : ''};
`;

export const Descripcion = styled.div``;
export const Parrafo = styled.p`
  font-size: ${({theme}) => theme.font.sizeP} ;
`;

export const Imagen = styled.img`
  width: 20em;
  height: 20em;
  margin: 2em;
`;

