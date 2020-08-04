import styled from 'styled-components';

export const CardContainer = styled.div(({isTalking,sePuedeReaccionar}) => `
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background: linear-gradient(145deg, #c7c7c7, #ececec);
  justify-content: space-between;
  margin: 0 0.5em;
  box-shadow: 5px 5px 10px #828282, -5px -5px 10px #ffffff;
  border-radius: 7px;
  position:relative;
  flex-direction: column;
  max-height: 350px;
  margin-top: 10px;
  width: 200px;
`);

export const ParticipantDataReactableContainer = styled.div(() => `
    width: 100%;
    height: 100%;
`
);

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  position:relative;
  align-items: center;
  padding: 2px 0px;
  justify-content: space-between;
  width: 100%;
  font-size: 1.06em;
  background-color: #ddddddab;
`;

export const UserAvatar = styled.div(({isTalking, avatar}) => `
  background-image: url(${avatar});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 75%;
  min-height: 200px;
  border-radius: 7px 7px 0 0;
  display: flex;
  align-items: flex-end;
`);

export const CardName = styled.span`
  text-align: left;
  color: black;
  max-width: 70%;
  margin-left: 6px;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
`;

export const Cerrar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2em;
  height: 2.2em;
  position:absolute;
  right:0em;
  top: 0em;
  border-radius: 0 7px 0 10px;
  opacity: 0.9;
  background: rgba(0, 0, 0, 0) linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200)) repeat scroll 0% 0%;
  cursor: pointer;
  color:red;

`;
