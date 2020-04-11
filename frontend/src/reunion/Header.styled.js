import styled from "styled-components";
import {animated} from 'react-spring';

export const HeaderContainer = styled(animated.div)`
  z-index: 10;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-evenly;
  width: calc(100% - ${({theme}) => theme.temario.width});
  height: ${({theme}) => theme.header.height};
`;

export const Titulo = styled.h1`
  font-size: ${({theme}) => theme.font.sizeH1} ;
  font-family: ${({theme}) => theme.font.h1};
  color: ${({theme}) => theme.colors.text};
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

