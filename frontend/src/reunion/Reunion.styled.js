import styled from 'styled-components';
import {animated} from 'react-spring';

// eslint-disable-next-line import/prefer-default-export
export const ReunionContainer = styled(animated.div)`
  display:flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
`;

export const VistaTemaContainer = styled(animated.div)`  
    display: flex;
    flex: 1;
    width: calc(100% - ${({theme}) => theme.sidebar.width});
    margin-top: ${({theme}) => theme.header.height};
`;
