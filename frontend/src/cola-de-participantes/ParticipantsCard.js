import React, {useEffect, useState} from 'react';
import ParticipantCounter from './ParticipantCounter';
import {CardContainer, CardInfoContainer, CardName, Cerrar,ParticipantDataReactableContainer, UserAvatar, Avatar, NoCardContainer,} from './ParticipantsCard.styled';
import getGravatarUrlFor from '../api/gravatar';
import {SkeletonBlock} from "../skeleton/Skeleton.styled";
import {ModalDeConfirmacion} from "../tipos-vista-principal/Modal";
import {TalkingReactions} from "./TalkingReactions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEject } from '@fortawesome/free-solid-svg-icons'

const ParticipantData = (props) => {
  return <>
    <UserAvatar isTalking={props.talking} type={props.type} >
      <Avatar src={getGravatarUrlFor(props.usuario.email)}/>
    <CardInfoContainer>
      <CardName isInteractive={props.interactive}> {props.usuario.nombre} </CardName>
      <ParticipantCounter isInteractive={props.interactive} estadoOrador={props.estadoOrador}/>
    </CardInfoContainer>
    </UserAvatar>
  </>;
}

const ParticipantsCard = ({sePuedeReaccionar = false, dispatch, participant, isParticipantTalking, interactive, kickear, finTema, usuario, type, tema}) => {
  const estadoOrador = () => {
    if (estaEncolado()) {
      return {detalle: 'encolado'};
    }
    if (hablo()) {
      return {detalle: 'hablo', seconds: Math.ceil((participant.fin - participant.inicio) / 1000)};
    }
    return {detalle: finTema? 'hablo' : 'hablando', seconds: Math.ceil(((Date.parse(finTema) || Date.now()) - participant.inicio) / 1000)};
  };

  const hablo = () => {
    return participant.fin !== null;
  };

  const estaEncolado = () => {
    return participant.inicio === null;
  };

  const [showSkeleton, setShowSekelton] = useState(true);
  const [oradorAKickear, setOradorAKickear] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSekelton(false), 1000)
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return showSkeleton ?
    <SkeletonComponent interactive isParticipantTalking={isParticipantTalking} sePuedeReaccionar={sePuedeReaccionar} type={type}/> : (participant ? (

      <CardContainer
        sePuedeReaccionar={sePuedeReaccionar}
        isInteractive={interactive}
        isTalking={isParticipantTalking}
        type={type}
      >
        {interactive && <Cerrar onClick={() => setOradorAKickear(participant.usuario)}><FontAwesomeIcon icon={faEject}/></Cerrar>}
        <ModalDeConfirmacion
          title={`¿Estás seguro que querés kickear a ${oradorAKickear && (oradorAKickear.nombre || '')}?`}
          open={Boolean(oradorAKickear)}
          confirmText={"Si"}
          cancelText={"No"}
          onClose={() => setOradorAKickear(null)} onConfirm={() => kickear(oradorAKickear)}/>

        {(sePuedeReaccionar) ?
          <>
            <ParticipantDataReactableContainer>
              <ParticipantData
                talking={isParticipantTalking}
                usuario={participant.usuario}
                interactive={interactive}
                estadoOrador={estadoOrador()}
                type={type}
                />
              <TalkingReactions
              usuario={usuario}
              dispatch={dispatch}
              participant={participant}
              tema={tema}/>
              
            </ParticipantDataReactableContainer>
          </> :
          <ParticipantData
            talking={isParticipantTalking}
            usuario={participant.usuario}
            interactive={interactive}
            estadoOrador={estadoOrador()}
            type={type}
          />
        }

    </CardContainer>
  ) : <NoCardContainer>Nadie esta hablando</NoCardContainer>);
};

export default ParticipantsCard;

const SkeletonComponent = ({interactive, isParticipantTalking, type, sePuedeReaccionar}) =>
  <CardContainer isInteractive={interactive} isTalking={isParticipantTalking} type={type}>
    {sePuedeReaccionar ? 
      <ParticipantDataReactableContainer>
      <UserAvatar><SkeletonBlock/></UserAvatar>
          <TalkingReactions skeleton/>
      </ParticipantDataReactableContainer>
    :
      <UserAvatar type={type}>
        <SkeletonBlock/>
        <CardInfoContainer style={{display: 'flex', alignItems: 'space-between'}}>
        </CardInfoContainer>
      </UserAvatar>
    }

  </CardContainer>;
