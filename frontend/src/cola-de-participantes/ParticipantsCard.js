import React, {useEffect, useState} from 'react';
import ParticipantCounter from './ParticipantCounter';
import {CardContainer, CardInfoContainer, CardName, Cerrar, UserAvatar,} from './ParticipantsCard.styled';
import getGravatarUrlFor from '../api/gravatar';
import {SkeletonBlock, SkeletonLine} from "../skeleton/Skeleton.styled";
import {ModalDeConfirmacion} from "../tipos-vista-principal/Modal";
import {
  faHashtag,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {reacciones} from "../mobile/actions";
import {ReactionButton} from "../mobile/ReactionButton";
import Grid from "@material-ui/core/Grid";
import {green, yellow} from "@material-ui/core/colors";
import * as PropTypes from "prop-types";

function TalkingReactions(props) {
  return <Grid container direction="column" spacing={3} style={{width: "30%",alignItems: "center",alignSelf:"flex-start"}}>
    <Grid item xs={4} justify="center" alignItems="center" style={props.style}>
      <ReactionButton
          background={props.background}
          isBig
          isActive={true} icon={faThumbsUp}
          onClick={props.onClick}/>
    </Grid>
    <Grid item xs={4} justify="center" alignItems="center" style={props.style}>
      <ReactionButton
          background={props.background}
          isBig
          isActive={true} icon={faThumbsDown}
          onClick={props.onClick}/>
    </Grid>
    <Grid item xs={4} justify="center" alignItems="center" style={props.style}>
      <ReactionButton
          background={props.background}
          isBig
          isActive={true} icon={faHashtag}
          onClick={props.onClick}/>
    </Grid>
  </Grid>;
}
TalkingReactions.propTypes = {
  style: PropTypes.shape({display: PropTypes.string, paddingRight: PropTypes.number, paddingLeft: PropTypes.number}),
  background: PropTypes.string,
  onClick: PropTypes.func
};
const ParticipantsCard = ({participant, isParticipantTalking, interactive, kickear, finTema}) => {
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
  const [open, setOpen] = useState(false);
  const [oradorAKickear, setOradorAKickear] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSekelton(false), 1000)
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  let centerReactionBtn = {
    display: "flex",
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: "none"
  };

  let reactionColor = 'linear-gradient(90deg, rgba(220,223,3,1) 0%, rgba(255,252,184,1) 100%)';
  return showSkeleton ? <SkeletonComponent interactive isParticipantTalking={isParticipantTalking}/> : (participant ? (

      <CardContainer style={{flexDirection: "row", width: "70%"}} isInteractive={interactive} isTalking={isParticipantTalking}>
        {interactive && <Cerrar onClick={() => setOradorAKickear(participant.usuario)}/>}
        <ModalDeConfirmacion
            title={`¿Estás seguro que querés kickear a ${oradorAKickear && oradorAKickear.nombre || ''}?`}
            open={Boolean(oradorAKickear)}
            confirmText={"Si"}
            cancelText={"No"}
            onClose={() => setOradorAKickear(null)} onConfirm={() => kickear(oradorAKickear)}/>
        <TalkingReactions style={centerReactionBtn} background={reactionColor} onClick={() => console.log("lol")}/>
        <div style={{width: "70%"}}>
          <UserAvatar isTalking={isParticipantTalking} avatar={getGravatarUrlFor(participant.usuario.email)}/>
          <CardInfoContainer>
            <CardName isInteractive={interactive}> {participant.usuario.nombre} </CardName>
            <ParticipantCounter isInteractive={interactive} estadoOrador={estadoOrador()}/>
          </CardInfoContainer>
        </div>
      </CardContainer>
  ) : <div> Nadie esta hablando</div>);
};

export default ParticipantsCard;

const SkeletonComponent = ({interactive, isParticipantTalking}) =>
  <CardContainer isInteractive={interactive} isTalking={isParticipantTalking}>
    <UserAvatar><SkeletonBlock/></UserAvatar>
    <CardInfoContainer style={{display: 'flex', alignItems: 'space-between'}}>
      <SkeletonLine/>
      <SkeletonLine/>
    </CardInfoContainer>
  </CardContainer>;
