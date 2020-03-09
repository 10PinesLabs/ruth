import styled from "styled-components";
import {font, header, temario} from "../styles/theme";
import {animated} from 'react-spring';

export const HeaderContainer = styled(animated.div)`
  z-index: 10;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-evenly;
  width: calc(100% - ${temario.width});
  height: ${header.height};
`;

export const Titulo = styled.h1`
  font-size: ${font.sizeH1} ;
  font-family: ${font.h1};
`;

