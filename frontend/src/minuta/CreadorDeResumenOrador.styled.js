import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { colors, font} from '../styles/theme';
import Button from '@material-ui/core/Button';

export const ResumenInput = styled.textarea`
width:100%;
resize:vertical;
`

export const ContenedorResumen = styled.div`
display:flex;
flex-direction: column;
margin-top:15px;
`

export const TituloDeResumen = styled.span`
color: ${props => props.disabled ? colors.black40 : colors.black50};
font-weight: 700;
`

export const BotonesDeResumen = styled.div`
display:flex;
width:100%;
justify-content: space-between;
margin-top: 15px;
`

export const TextButton = withStyles({
    root:{
        color: colors.primary,
        fontFamily: font.family,
        fontWeight:600
    },
    label:{
        textTransform:"none"    
    }
    })(Button);

export const ThemedButton = withStyles({
    root:{
        color: colors.white,
        background:colors.primary,
        fontFamily: font.family,
        fontWeight:600,
        '&:hover': {
            background: colors.secondary,
         },
        '&:disabled': {
            background: colors.black20,
        },
    },
    label:{
        textTransform:"none"    
    },
    
    })(Button);