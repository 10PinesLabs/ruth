import React from 'react'
import { IconBox, IconContainer, IconList } from "./Chart.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faSync, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export const ReactionsIcons = () => (
  <IconList>
    <IconBox>
      <Icon icon={faThumbsUp} backgroundColor={'#68A1EA'}/>
      <Icon icon={faThumbsDown} backgroundColor={'#FFB3BA'}/>
      <Icon icon={faHashtag} backgroundColor={'#FFDFBA'}/>
      <Icon icon={faSync} backgroundColor={'#68C9B2'}/>
    </IconBox>
  </IconList>
);

const Icon = ({icon, backgroundColor}) => (
  <IconContainer backgroundColor={backgroundColor}>
    <FontAwesomeIcon icon={icon} size='lg' color='black'/>
  </IconContainer>
);
