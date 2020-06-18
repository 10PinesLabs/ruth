import styled from 'styled-components';
import {colors} from '../styles/theme';
import {animated} from 'react-spring';

export const VistaDelMedioContainer = styled(animated.div)` 
    display: flex; 
    flex-direction: column;
    flex: 1;
    align-items: center;
    width: 100%;
`;

export const VistaMinutaContainer = styled(animated.div)` 
    display: flex; 
    flex-direction: column;
    align-items: center;
    width:90%;
`;

export const Botonera = styled.div` 
    display: flex; 
    flex-direction: column;
    width: 40%;
`;

export const BotoneraNavegacionTemas = styled.div` 
    display: flex; 
    flex-direction: row;
    color: ${colors.black30};
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 2rem;
`;
