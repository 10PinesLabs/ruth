import styled from 'styled-components';
import {animated} from 'react-spring'

export const SlidesContainer = styled(animated.div)` 
    display: flex; 
    flex-direction: column;
    flex: 1;
    align-items: center;
    background: ${({theme}) => theme.colors.background};
`;
