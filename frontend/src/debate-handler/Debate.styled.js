import styled from 'styled-components';
import { font, sidebar } from '../styles/theme';

export const DebateContainer = styled.div`  
    display: flex;
    flex: 1;
    width: calc(100% - ${sidebar.width});
    margin-top: 5em;
`;

export const SubDebateContainer = styled.div`  
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
    overflow: hidden;
`;

export const TitleContainer = styled.div`  
    position: absolute;
    top: 0;
    right: calc(${sidebar.width}/2);
    display: flex;
    flex-direction: column;
    height: 10%;
    width: 100%;
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
    background-color: white;
    height: 45%
    align-items: center;
    justify-content: start;
    padding: 2em 0 0 0;
`;

export const Titulo = styled.h1`

  font-size: ${font.sizeH1} ;
  font-family: ${font.h1};
`;
