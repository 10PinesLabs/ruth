import React from 'react';
import {
  InfoImage, InfoItemContainer, InfoImageContainer, Texto,
} from './InfoItemContainer.styled';

const InfoItem = (props) => (
    <InfoItemContainer>
      <InfoImageContainer withPadding={!props.isAvatar}>
        <InfoImage src={props.src} alt={props.altText} rounded={props.isAvatar}/>
      </InfoImageContainer>
      <Texto> {props.descripcion} </Texto>
    </InfoItemContainer>
);

export default InfoItem;
