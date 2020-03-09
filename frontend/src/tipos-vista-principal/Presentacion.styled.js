import styled from 'styled-components';
import {colors} from '../styles/theme';
import {animated} from 'react-spring'

export const SlidesContainer = styled(animated.div)` 
    display: flex; 
    flex-direction: column;
    flex: 1;
    align-items: center;
    background: ${colors.background};
`;
