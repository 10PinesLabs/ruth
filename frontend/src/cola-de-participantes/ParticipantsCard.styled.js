import styled from 'styled-components';
import {font} from "../styles/theme";

export const CardContainer = styled.div(({isTalking}) => `
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, #c7c7c7, #ececec);
  justify-content: space-between;
  width: ${isTalking ? '12em' : '10em'};
  height: ${isTalking ? '15em' : '13.5em'};
  margin: 0 0.5em;
  box-shadow: 5px 5px 10px #828282, -5px -5px 10px #ffffff;
  border-radius: 20px;
  position:relative;
`);

export const CardInfoFooter = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 0.5em 0;
`;

export const TalkingAnimationContainer = styled.div`
  position: absolute;
  left: 5%;
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
  font-size: ${font.sizeP};
  text-align: center;
  color: black;
`;

export const Cerrar = styled.div`
  display: block;
  width: 1.5em;
  height: 1.5em;
  position:absolute;
  right:-0.75em;
  top: -0.75em;
  border-radius: 50%;
  opacity: 0.9;
  background: rgba(0, 0, 0, 0) linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200)) repeat scroll 0% 0%;
  box-shadow: rgb(130, 130, 130) 4px 4px 10px, rgb(255, 255, 255) -4px -4px 10px;
  cursor: pointer;
  :after{
    display: flex;
    content: '';
    background: url(./kick.svg) no-repeat center center;
    background-size: 0.7em;
    fill: gray;
    width: 100%;
    height: 100%;
    align-items:center;
    justify-content: center;
  }
`;
