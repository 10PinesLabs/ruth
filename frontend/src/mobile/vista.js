import React, { useEffect, useState } from 'react';
import {
  faSync,
  faThumbsDown,
  faThumbsUp,
  faHandPaper,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ParticipantsCard from '../cola-de-participantes/ParticipantsCard';
import { ReactionButton } from './ReactionButton';
import {
  ActionContainerStyle,
  Logo,
  LogoHeader,
  LogoLabel,
  MobileUsableArea,
  ParticipantsContainer,
  SubjectTitle,
  TemaNoEmpezado,
  TopSectionContainer,
  MicrophoneContainer,
  ReactionsContainer,
  SpeakerAreaContainer,
  CantidadDeOradoresContainer,
  TitleContainer,
  TitleDecoration,
  TemaReactionButtonContainer
} from './vista.styled';
import { oradorEventos } from '../store/oradores';
import { CardInteractionsContainer } from '../components/InteractionsContainer.styled';
import { reaccionEventos } from '../store/reacciones';
import { SkeletonCircle, SkeletonLine, ReactionSkeletonContainer, SkeletonBlock, MobileCallToActionSkeletonContainer } from '../skeleton/Skeleton.styled';
import { reacciones } from './actions';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { colors } from '../../src/styles/theme.js'
import Button from '@material-ui/core/Button';
import { CantidadDeOradores } from './CantidadDeOradores'

const logoImage = 'https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_'
  + '256,f_auto,q_auto:eco/wuhk5weer0fkhmh2oyhv';

const getFontSizeForWindow = () => {
  const { innerHeight } = window;
  if (innerHeight < 590) return '12';
  if (innerHeight < 670) return '14';
  if (innerHeight < 750) return '16';
  if (innerHeight < 1024) return '19';
  if (innerHeight < 1242) return '21';
  if (innerHeight < 1380) return '23';
  if (innerHeight < 1518) return '25';
  if (innerHeight < 1656) return '27';
  if (innerHeight < 1795) return '30';
  if (innerHeight < 1933) return '32';
  if (innerHeight < 2071) return '34';
  if (innerHeight < 2209) return '36';
  return '39';
};


const Vista = ({
  dispatch,
  temaEmpezado,
  title,
  usuario,
  remainingParticipantsUpToUser,
  participant,
  thumbsDown,
  thumbsUp,
  slack,
  redondear,
  wannaTalk,
  isTalking,
  tema,
  queuedParticipants
}) => {
  const handleReaction = (nombre, estaReaccionado) => {
    const evento = estaReaccionado ? reaccionEventos.desreaccionar(usuario, nombre, tema.id) :  reaccionEventos.reaccionar(usuario, nombre, tema.id);
    dispatch(evento);
  };

  const onWannaTalkClick = () => {
    dispatch(oradorEventos.levantarMano(usuario, tema.id));
  };

  const onWannaStopTalkClick = () => {
    const estoyHablando = participant.usuario.email === usuario.email;
    if (estoyHablando) dispatch(oradorEventos.dejarDeHablar(usuario, tema.id));
    else dispatch(oradorEventos.desencolar(usuario, tema.id));
  };

  const kickear = ( usuario ) => {
    dispatch(oradorEventos.kickear(usuario, tema.id));
  };

  const [showSkeleton, setShowSekelton] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowSekelton(false), 1000);
  }, []);

  const inQueueIcon = () => (faTimes);

  const MobileCallToActionButton = ({children, color = colors.primary, ...props}) => {
    return (
      <Button
        variant="outlined"
        style={{ color: color, borderColor: color }}
        size="large"
        {...props}
      >
        {children}
      </Button>
    );
  };

  let botonesDeReaccion;
  if (temaEmpezado) {
    botonesDeReaccion = (
      <ReactionsContainer height={6}>
        <TemaReactionButtonContainer>
          <ReactionButton
            isBig isActive={thumbsUp}
            isDisabled={thumbsDown} icon={faThumbsUp}
            activeBackground={colors.thumbsUp}
            onClick={() => handleReaction(reacciones.THUMBS_UP, thumbsUp)}/>
        </TemaReactionButtonContainer>
        <TemaReactionButtonContainer>
          <ReactionButton
            isBig isActive={thumbsDown}
            isDisabled={thumbsUp} icon={faThumbsDown}
            activeBackground={colors.thumbsDown}
            onClick={() => handleReaction(reacciones.THUMBS_DOWN, thumbsDown)}/>
        </TemaReactionButtonContainer>
        <TemaReactionButtonContainer>
          <ReactionButton
            activeBackground={colors.slack}
            isBig isActive={slack} icon={faSlack}
            onClick={() => handleReaction(reacciones.SLACK, slack)}/>
        </TemaReactionButtonContainer>
        <TemaReactionButtonContainer>
          <ReactionButton
            isBig isActive={redondear} icon={faSync}
            activeBackground={colors.roundUp}
            onClick={() => handleReaction(reacciones.REDONDEAR, redondear)}/>
        </TemaReactionButtonContainer>
      </ReactionsContainer>
    );
  } else {
    botonesDeReaccion = <TemaNoEmpezado> El tema todavia no empezo </TemaNoEmpezado>;
  }

  let microphone;
  if (temaEmpezado) {
    if (isTalking) {
      microphone = (
        <MicrophoneContainer>
          <MobileCallToActionButton
            color="black"
            onClick={onWannaStopTalkClick}
            startIcon={
              <FontAwesomeIcon icon={inQueueIcon()} color="black" size={"2x"} />
            }
          >
            Dejar de hablar
          </MobileCallToActionButton>
        </MicrophoneContainer>
      );
    } else if (wannaTalk) {
      microphone = (
        <MicrophoneContainer>
          <MobileCallToActionButton
            onClick={onWannaStopTalkClick}
            color="black"
            startIcon={
              <FontAwesomeIcon
                icon={inQueueIcon()}
                color={"black"}
                size={"2x"}
              />
            }
          >
            Desencolarse
          </MobileCallToActionButton>
        </MicrophoneContainer>
      );
    } else {
      microphone = (
        <MobileCallToActionButton
          onClick={onWannaTalkClick}
          startIcon={
            <FontAwesomeIcon
              icon={faHandPaper}
              color={colors.primary}
              size={"2x"}
            />
          }
        >
          Quiero hablar
        </MobileCallToActionButton>
      );
    }
  } else {
    microphone = (
      <MobileCallToActionButton
        color="#ff3b3b8c"
        disabled
        startIcon={
          <FontAwesomeIcon icon={faHandPaper} color={"#ff3b3b8c"} size={"2x"} />
        }
      >
        Aun no
      </MobileCallToActionButton>
    );
  }


  return (
    <MobileUsableArea fontSize={getFontSizeForWindow()}>
      <TopSectionContainer>
        <LogoHeader>
          <Logo src={logoImage}/>
          <LogoLabel> Ruth </LogoLabel>
        </LogoHeader>
        <CardInteractionsContainer>
          <TitleContainer>
            <TitleDecoration>TEMA</TitleDecoration>
            <SubjectTitle>
              {showSkeleton ? <SkeletonLine/> : title}
            </SubjectTitle>
            
          </TitleContainer>
          
          {showSkeleton
            ? <ReactionsContainer height={6}>
                <TemaReactionButtonContainer>
                  <ReactionSkeletonContainer>
                    <SkeletonCircle/>
                  </ReactionSkeletonContainer>
                </TemaReactionButtonContainer>
                <TemaReactionButtonContainer>
                  <ReactionSkeletonContainer>
                    <SkeletonCircle/>
                  </ReactionSkeletonContainer>
                </TemaReactionButtonContainer>
                <TemaReactionButtonContainer>
                  <ReactionSkeletonContainer>
                    <SkeletonCircle/>
                  </ReactionSkeletonContainer>
                </TemaReactionButtonContainer>
                <TemaReactionButtonContainer>
                  <ReactionSkeletonContainer>
                    <SkeletonCircle/>
                  </ReactionSkeletonContainer>
                </TemaReactionButtonContainer>
            </ReactionsContainer>
            : botonesDeReaccion
          }
        </CardInteractionsContainer>
      </TopSectionContainer>
      <ParticipantsContainer>
        <SpeakerAreaContainer>
          { queuedParticipants?.length>0 &&
          <CantidadDeOradoresContainer>
            <CantidadDeOradores
             wannaTalk={wannaTalk}
             queuedParticipants={queuedParticipants}
             remainingParticipantsUpToUser={remainingParticipantsUpToUser}
             />
          </CantidadDeOradoresContainer>
            }
          <ParticipantsCard
            sePuedeReaccionar={
              process.env.REACT_APP_MINUTA_PERMITIDA === "true"
            }
            usuario={usuario}
            interactive
            isParticipantTalking
            dispatch={dispatch}
            kickear={kickear}
            participant={participant}
            tema={tema}/>
          </SpeakerAreaContainer>
        <ActionContainerStyle>
          {showSkeleton ? 
            <MobileCallToActionSkeletonContainer>
              <SkeletonBlock/>
            </MobileCallToActionSkeletonContainer>
            : 
            microphone
          }
        </ActionContainerStyle>
      </ParticipantsContainer>
    </MobileUsableArea>
  );
};

export default Vista;

