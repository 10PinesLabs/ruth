import { createGlobalStyle } from 'styled-components';
import {colors, font, sizeBreakpoint} from './styles/theme';


export default createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:300,400,700&display=swap);
  @import url('https://fonts.googleapis.com/css?family=Poppins:100,200,400&display=swap');
html {
  font-family: ${font.family};
  font-size: ${font.baseSize};
  
  @media (min-width: ${sizeBreakpoint.medium}) {
    font-size: calc(${font.baseSize} *1.2);
  }

  @media (min-width: ${sizeBreakpoint.large}) {
    font-size: calc(${font.baseSize} *1.3);
  }

  @media (min-width: ${sizeBreakpoint.xlarge}) {
    font-size: calc(${font.baseSize} *2);
  }

  @media (min-width: ${sizeBreakpoint.xxlarge}) {
    font-size: calc(${font.baseSize} *2.3);
  }
  
  scroll-behavior: smooth;
  scrollbar-width: none;
}

body {
  background: ${colors.background};
  margin: 0;
  padding: 0;
  overflow-x:hidden;
}

#root {
  height: 100vh;
}
`;
