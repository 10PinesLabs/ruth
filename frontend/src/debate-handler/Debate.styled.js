import styled from 'styled-components';
import {animated} from 'react-spring';

export const Coso = styled.div`  
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 50%;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
`;

export const SubDebateContainer = styled(animated.div)`  
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;

export const GraphsContainer = styled.div`  
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
