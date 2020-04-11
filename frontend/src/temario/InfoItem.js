import React from 'react';
import {InfoImage, InfoImageContainer, InfoItemContainer, Texto,} from './InfoItemContainer.styled';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const InfoItem = (props) => {
  const Image = props.isAvatar ? InfoImage : FontAwesomeIcon;
  return (
    <InfoItemContainer>
      <InfoImageContainer withPadding={!props.isAvatar}>
        <Image src={props.src} alt={props.altText} rounded={props.isAvatar} icon={props.icon} size={'2x'}/>
      </InfoImageContainer>
      <Texto> {props.descripcion} </Texto>
    </InfoItemContainer>
  )
};

export default InfoItem;
