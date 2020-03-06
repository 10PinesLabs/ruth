import styled from 'styled-components';
import {colors} from '../styles/theme';

export const PresentacionContainter = styled.div`  
    display: flex;
    flex: 1;
`;

export const SlidesContainer = styled.div` 
    display: flex; 
    flex-direction: column;
    flex: 1;
    align-items: center;
    background: ${colors.background};
`;
