import styled from 'styled-components';
import {header, sidebar} from "../styles/theme";

// eslint-disable-next-line import/prefer-default-export
export const ReunionContainer = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
`;

export const VistaTemaContainer = styled.div`  
    display: flex;
    flex: 1;
    width: calc(100% - ${sidebar.width});
    margin-top: ${header.height};
`;
