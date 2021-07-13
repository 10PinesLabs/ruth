import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { colors, font } from '../styles/theme';

export const ContenedorResumen = styled.div`
width:60%;
display:flex;
flex-direction: column;
margin-top:15px;
`;

export const BotonesDeResumen = styled.div`
display:flex;
width:100%;
justify-content: space-between;
margin-top: 15px;
`;

export const TextButton = withStyles({
  root: {
    color: colors.primary,
    fontFamily: font.family,
    fontWeight: 600,
  },
  label: {
    textTransform: 'none',
  },
})(Button);

export const ThemedButton = withStyles({
  root: {
    color: colors.white,
    background: colors.primary,
    fontFamily: font.family,
    fontWeight: 600,
    '&:hover': {
      background: colors.darkPrimary,
    },
    '&:disabled': {
      background: colors.black20,
    },
  },
  label: {
    textTransform: 'none',
  },

})(Button);
