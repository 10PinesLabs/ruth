import styled from "styled-components";


export const SwitchContainer = styled.div`
  position: absolute;
  z-index: 2000;
  bottom: 1em;
  right: 1em;
  color: ${({theme}) => theme.colors.primary}
`;

export const Icon = styled.img`
  height: 24px;
  width: 24px;
`;
