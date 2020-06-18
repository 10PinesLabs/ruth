import React from 'react'
import { IconBox, IconContainer, IconList } from "./Chart.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

export const ReactionsIcons = ({centered}) => (
  <IconList>
    <IconBox>
      <Icon icon={faThumbsUp} backgroundColor={'#68A1EA'} centered = {centered}/>
      <Icon icon={faThumbsDown} backgroundColor={'#FFB3BA'} centered = {centered}/>
      <Icon icon={faSlack} backgroundColor={'#FFDFBA'} centered = {centered}/>
      <Icon icon={faSync} backgroundColor={'#68C9B2'} centered = {centered}/>
    </IconBox>
  </IconList>
);

const Icon = ({icon, backgroundColor, centered}) => (
  <IconContainer backgroundColor={backgroundColor} centered={centered}>
    <FontAwesomeIcon icon={icon} size='1x' color='black'/>
  </IconContainer>
);
