import styled from 'styled-components';
import { colors, font } from '../styles/theme';

export const Button = styled.button`
  font-family: ${font.p};
  @media (max-width: 1920px),(max-height: 1080px)  {
    font-size:  ${font.sizeP};
  }
  @media (min-width: 1920px), @media (min-height: 1080px)  {
    font-size: 1.75em;
  }
  background: ${(props) => (!props.disabled ? colors.primary : colors.black30)};
  border-radius: 0.2em;
  border: none;
  padding: 0.5em 3em;
  cursor: pointer;
  color: ${(props) => (!props.disabled ? colors.white : colors.black50)};
  font-family: ${font.p};
  &:hover {
    background: ${(props) => (!props.disabled ? colors.viridian : colors.black30)};
  }
`;

export const SecondaryButton = styled(Button)`
  border: 0.07em solid;
  border-color: ${(props) => (!props.disabled ? colors.downy : colors.black30)};
  background: ${colors.white};
  color: ${(props) => (!props.disabled ? colors.downy : colors.black40)};
  &:hover {
    background: ${(props) => (!props.disabled ? colors.black10 : colors.white)};
  }
`;
