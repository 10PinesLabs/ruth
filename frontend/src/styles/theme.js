const font = {
  family: "'Poppins',sans-serif",
  module: '16px',
  h1: "'Poppins',sans-serif",
  sizeH1: '3.5rem',
  h2: "'Poppins',sans-serif",
  sizeH2: '2rem',
  p: 'Montserrat, sans-serif',
  sizeP: '1.25rem',
  sizeCountdown: '4.5rem',

};

const lightColors = {
  primary: '#68C9B2',
  secondary: '#448495',
  darkRed: '#FF7F7F',
  black50: '#7F7F7F',
  black40: '#AFAFAF',
  black30: '#DADADA',
  black20: '#E6E6E6',
  black10: '#EEEEEE',
  background: '#F2F2F2',
  text: '#2d2d2d',
  viridian: '#448475',
  downy: '#68c9b2',
  white: '#FFFFFF',
  mobileBackground: '#DDDDDD',
};

const darkColors = {
  primary: '#4c9382',
  secondary: '#448495',
  darkRed: '#f2777a',
  black50: '#d3d0c8',
  black40: '#d3d0c8',
  black30: '#696969',
  black20: '#4b4b4b',
  black10: '#373737',
  background: '#2d2d2d',
  text: '#d3d0c8',
  viridian: '#448475',
  downy: '#4c9382',
  white: '#373737',
  mobileBackground: '#4b4b4b',
};

const variables = {
  headerHeight: '3rem',
};


const sizeBreakpoint = {
  bigWidth: '1920px',
  bigHeight: '1080px',
};

const sidebar = {
  width: '18rem',
};

const temario = {
  width: '18rem',
};

const header = {
  height: '6em',
};

export const getTheme = mode => {
  return {
    font,
    colors: mode === 'dark'? darkColors : lightColors,
    variables,
    sizeBreakpoint,
    sidebar,
    temario,
    header,
  }
};
