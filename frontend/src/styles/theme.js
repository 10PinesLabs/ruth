import { TextField, withStyles } from '@material-ui/core';

export const font = {
  family: "'Poppins',sans-serif",
  module: '16px',
  h1: "'Poppins',sans-serif",
  sizeH1: '3.5rem',
  h2: "'Poppins',sans-serif",
  sizeH2: '2rem',
  p: 'Montserrat, sans-serif',
  sizeP: '1.25rem',
  sizeCountdown: '4.5rem',
  baseSize: '12px',
};

export const colors = {
  primary: '#00AC83',
  secondary: '#c3cacc78',
  darkPrimary: '#448495',
  lightGrey: '#E0E0E0',
  darkRed: '#d32f2f',
  black50: '#7F7F7F',
  black40: '#AFAFAF',
  black30: '#DADADA',
  black20: '#E6E6E6',
  black10: '#EEEEEE',
  background: '#F2F2F2',
  viridian: '#448475',
  downy: '#68c9b2',
  white: '#FFFFFF',
  black: '#000000',
  thumbsUp: '#68A1EA',
  thumbsDown: '#FFB3BA',
  slack: '#FFDFBA',
  roundUp: '#68C9B2',
  defaultInactiveBackground: '#E6E6E6',
  defaultActiveBackground: '#72B572',
};

export const variables = {
  headerHeight: '3rem',
};

export const sizeBreakpoint = {
  small: '768px',
  medium: '1024px',
  large: '1366px',
  xlarge: '1800px',
  xxlarge: '2560px',
};

export const sidebar = {
  width: '18rem',
};

export const temario = {
  width: '18rem',
};

export const header = {
  height: '6em',
};

export const ThemedTextfield = withStyles({
  root: {
    width: '100%',
    '& label.Mui-focused': {
      color: `${colors.primary} !important`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: colors.black50,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      },
    },
  },
})(TextField);
