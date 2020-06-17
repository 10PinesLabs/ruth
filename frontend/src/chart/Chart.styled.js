import styled from 'styled-components';

export const ChartlineContainer = styled.div`
  width: 50%;
`;

export const IconList = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 50%
`;

export const IconBox = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: space-evenly;
  width: 25%;
`;

export const IconContainer = styled.div(({backgroundColor}) => `
  border-radius: 50%;
  padding: 10px;
  background-color: ${backgroundColor}
  border: 0.1rem solid black;
`);
