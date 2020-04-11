import styled from 'styled-components';

export const Button = styled.button`
  font-family: ${({theme}) => theme.font.p};
  font-size:  ${({theme}) => theme.font.sizeP};
  background: ${({theme, disabled}) => (!disabled ? theme.colors.primary : theme.colors.black30)};
  border-radius: 0.2em;
  border: none;
  padding: 0.5em 3em;
  cursor: ${({disabled}) => (!disabled ? 'pointer' : null)};
  color: ${({disabled, theme}) => (!disabled ? theme.colors.white : theme.colors.black50)};
  font-family: ${({theme}) => theme.font.p};
  &:hover {
    background: ${({disabled, theme}) => (!disabled ? theme.colors.viridian : theme.colors.black30)};
  }
`;

export const SecondaryButton = styled(Button)`
  border: 0.07em solid;
  border-color: ${({disabled, theme}) => (!disabled ? theme.colors.downy : theme.colors.black30)};
  background: ${({theme}) => theme.colors.white};
  color: ${({disabled, theme}) => (!disabled ? theme.colors.downy : theme.colors.black40)};
  &:hover {
    background: ${({disabled, theme}) => (!disabled ? theme.colors.black10 : theme.colors.white)};
  }
`;
