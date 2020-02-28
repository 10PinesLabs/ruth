import styled from 'styled-components';
import { colors, font, sizeBreakpoint } from '../styles/theme';

export const InfoItemContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoImageContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 0.25rem solid ${colors.viridian};
  height: 9rem;
  width: 9rem;
  @media (min-width: ${sizeBreakpoint.bigWidth}), @media (min-height: ${sizeBreakpoint.bigHeight}) {
    height: 15rem;
    width: 15rem;
  }
  overflow: hidden;
  background: ${colors.white};
  box-sizing: border-box;
  ${(props) => props.withPadding && 'padding: 1.25rem;'}
`;

export const InfoImage = styled.img`
  src: '${(props) => props.src}';
  max-width: 100%;
  max-height: 100%;
  ${(props) => props.rounded && 'border-radius: 50%;'}
`;

export const Texto = styled.p`
font-size: 1rem;
@media (min-width: ${sizeBreakpoint.bigWidth}), @media (min-height: ${sizeBreakpoint.bigHeight})  {
  font-size: 2rem;
}
font-family: ${font.p};
color:white;
margin-top: 1em;
text-align: center;
max-width: 90%;

`;
