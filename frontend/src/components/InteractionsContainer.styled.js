import styled from 'styled-components';

export const CardInteractionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background-color: #DDDDDD;
`;
