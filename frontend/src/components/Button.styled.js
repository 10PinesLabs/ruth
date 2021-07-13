import styled from 'styled-components';
import { colors, font } from '../styles/theme';

export const Button = styled.button`
  font-family: ${font.p};
  font-size:  ${font.sizeP};
  background: ${(props) => (!props.disabled ? colors.primary : colors.black30)};
  border-radius: 0.2em;
  border: none;
  padding: 0.5em 3em;
  cursor: ${(props) => (!props.disabled ? 'pointer' : null)};
  color: ${(props) => (!props.disabled ? colors.white : colors.black50)};
  &:hover {
    background: ${(props) => (!props.disabled ? colors.viridian : colors.black30)};
  }
`;

export const ButtonReunionCerrada = styled(Button)`
  font-size: medium;
  padding: 0.5em;
  margin: 0em 0.5em 0.1em 0.5em;
  &:hover {
    background: ${(props) => (!props.disabled ? colors.viridian : colors.black30)};
  }
`;

export const SecondaryButtonReunionCerrada = styled(ButtonReunionCerrada)`
  background: ${(props) => (!props.disabled ? colors.secondary : colors.black30)};
  color: ${(props) => (!props.disabled ? colors.black : colors.black50)};
  &:hover {
    background: ${(props) => (!props.disabled ? colors.black40 : colors.black30)};
  }
`;

export const ButtonIcono = styled(ButtonReunionCerrada)`
  background: ${(props) => (!props.disabled ? colors.secondary : colors.black30)};
  color: ${(props) => (!props.disabled ? colors.black : colors.black50)};
  &:hover {
    background: ${(props) => (!props.disabled ? colors.black40 : colors.black30)};
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

export const UnirseButton = styled(Button)`
  margin: 0.5em;
  min-width: 11em;
`;
