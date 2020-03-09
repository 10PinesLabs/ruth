import styled from 'styled-components';
import {header, sidebar} from '../styles/theme';

export const DebateContainer = styled.div`  
    display: flex;
    flex: 1;
    width: calc(100% - ${sidebar.width});
    margin-top: ${header.height};
`;

export const SubDebateContainer = styled.div`  
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

export const ParticipantsContainer = styled.div`  
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 50%
    align-items: center;
    justify-content: center;
`;
