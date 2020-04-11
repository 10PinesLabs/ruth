import styled from 'styled-components';
import {animated} from 'react-spring';

export const InfoItemContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 10em;
  min-height: 8em;
`;

export const InfoImageContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 0.15rem solid ${({theme}) => theme.colors.viridian};
  height: 5rem;
  width: 5rem;
  overflow: hidden;
  background: ${({theme}) => theme.colors.white};
  box-sizing: border-box;
  ${(props) => props.withPadding && 'padding: 1.25rem;'}
   color: ${({theme}) => theme.colors.text}
`;

export const InfoImage = styled.img`
  src: '${(props) => props.src}';
  max-width: 100%;
  max-height: 100%;
  ${(props) => props.rounded && 'border-radius: 50%;'}
`;

export const Texto = styled.p`
  font-size: 1rem;
  font-family: ${({theme}) => theme.font.p};
  color: ${({theme}) => theme.colors.text};
  margin-top: 1em;
  text-align: center;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 8em;
`;

export const InfoTemaContainer = styled(animated.div)`
  display:flex;
  align-items: center;
  justify-content: space-evenly;
  width: 20em;
  height: 10em;
`;
