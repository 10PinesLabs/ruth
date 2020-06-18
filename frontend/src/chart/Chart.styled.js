import styled from 'styled-components';

export const ChartlineContainer = styled.div`
  width: 50%;
`;

export const IconList = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 50%
  margin-left: 2.6rem; //TODO: Cambiar esto por algo mas responsive
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 25%;
`;

export const IconContainer = styled.div(({backgroundColor, centered}) => `
  margin: ${centered ? '0' : '0 4rem'};
  margin-top: -0.5rem;
  height: 35px;
  width: 35px;
  min-width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${backgroundColor}
  opacity: 0.7;
`);
