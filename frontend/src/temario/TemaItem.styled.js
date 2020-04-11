import styled from 'styled-components';
export const TemaItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin: 0.5em 0;
  justify-content: space-between;
  cursor: pointer;
`;

export const TituloTema = styled.div`
  font-family: ${({theme}) => theme.font.p};
  font-size:  ${({theme}) => theme.font.sizeP};
  letter-spacing: 1px;
  color: ${({estaSeleccionado, theme}) => estaSeleccionado ? theme.colors.text : theme.colors.black10};
  transition: color 0.1s ease-in;
  max-width: calc(100% - 2.5rem)
  
`;

export const ImagenTemaContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  overflow: hidden;
  background: ${({theme}) => theme.colors.white};
  padding: 0.4rem;
  box-sizing: border-box;
  opacity: 0.8;
  margin-right: 2%;
  svg {
    color: ${({theme}) => theme.colors.text};
  }
`;
