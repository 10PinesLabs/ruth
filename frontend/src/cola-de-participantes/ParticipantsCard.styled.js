import styled from 'styled-components';

export const CardContainer = styled.div(({isTalking}) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, #c7c7c7, #ececec);
  justify-content: space-between;
  width: ${isTalking ? '12em' : '10em'};
  height: ${isTalking ? '15em' : '13.5em'};
  margin: 0 0.5em;
  box-shadow: 5px 5px 10px #828282, -5px -5px 10px #ffffff;
  border-radius: 20px;
`);

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 0.5em 0;
`;

export const UserAvatar = styled.div(({isTalking, avatar}) => `
  background-image: url(${avatar});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: ${isTalking? '9.5em' : '8em'};
  width: 100%;
  border-radius: 20px 20px 0 0;
`);

export const CardName = styled.span`
  font-size: 1.2rem;
  text-align: center;
  color: black;
`;
