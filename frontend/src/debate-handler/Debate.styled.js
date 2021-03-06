import styled from 'styled-components';
import {animated} from 'react-spring';

export const GraphsAndLabelsContainer = styled.div`  
    display: flex;
    flex-direction: column;
    border-top: 1px solid silver;
    height: 60%;
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

export const ReactionsContainer = styled.div`  
    display: flex;
    justify-content: space-around;
`
export const ParticipantsContainer = styled.div`
display: flex;
align-items: center;
height: 40%;
justify-content: center;
`