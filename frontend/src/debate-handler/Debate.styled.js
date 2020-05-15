import styled from 'styled-components';
import {animated} from 'react-spring';

export const SubDebateContainer = styled(animated.div)`  
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;

export const GraphsContainer = styled.div`  
    display: flex;
    flex-direction: row;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    height: 50%;
    align-items: center;
    justify-content: space-between;
`;

export const ChartWrapperContainer = styled.div`  
    display: flex;
    flex-direction: column;
`;

export const IconListContainer = styled.div`  
    display: flex;
    justify-content: space-between;
`;
