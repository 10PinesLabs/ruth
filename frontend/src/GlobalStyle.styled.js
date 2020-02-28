import { createGlobalStyle } from 'styled-components';
import { colors, font } from './styles/theme';


export default createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:300,400,700&display=swap);
  @import url('https://fonts.googleapis.com/css?family=Poppins:100,200,400&display=swap');
html {
  font-family: ${font.family};
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
