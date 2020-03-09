import styled from 'styled-components';
import { font, sidebar } from '../styles/theme';

export const DebateContainer = styled.div`  
    display: flex;
    flex: 1;
    width: calc(100% - ${sidebar.width});
`;

export const SubDebateContainer = styled.div`  
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
    overflow: hidden;
`;

export const TitleContainer = styled.div`  
    display: flex;
    flex-direction: column;
    height: 10%;
    align-items: center;
    justify-content: center;
`;

export const GraphsContainer = styled.div`  
    display: flex;
    flex-direction: row;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    height: 45%;
    align-items: center;
    justify-content: space-between;
`;

export const ParticipantsContainer = styled.div`  
    display: flex;
    flex-direction: column;
    height: 45%
    align-items: center;
    justify-content: center;
`;

export const Titulo = styled.h1`
  font-size: ${font.sizeH1} ;
  font-family: ${font.h1};
`;
