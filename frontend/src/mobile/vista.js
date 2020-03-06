import React from 'react';
import {
  faHashtag,
  faMale,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faSync,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ParticipantsCard from '../cola-de-participantes/ParticipantsCard';
import {ReactionButton} from './ReactionButton';
import {
  ActionContainerStyle,
  Logo,
  LogoHeader,
  LogoLabel,
  MobileUsableArea,
  ParticipantsContainer,
  QueuedParticipants,
  SubjectTitle,
  TemaNoEmpezado,
  TopSectionContainer,
} from './vista.styled';
import {ReactionsContainer} from '../components/SubjectReactionsContainer.styled';
import {tipoDeEvento} from '../store/oradores';
import {CardInteractionsContainer} from '../components/InteractionsContainer.styled';
import {reactionTypes} from '../store/reacciones';
import {reacciones} from "./index";

const talkButtonStyle = (pressed, talking) => {
  let background;

  background = 'linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200)';
  if (pressed) background = 'linear-gradient(145deg, rgb(114, 181, 114), rgb(205, 255, 205))';
  if (talking) background = 'linear-gradient(145deg, rgb(114, 181, 114), rgb(205, 255, 205))';

  return {
    height: '6em',
    width: '6em',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1em',
    boxShadow: 'rgb(130, 130, 130) 4px 4px 10px, rgb(255, 255, 255) -4px -4px 10px',
    background,
  };
};

const logoImage = 'https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_'
  + '256,f_auto,q_auto:eco/wuhk5weer0fkhmh2oyhv';

const getFontSizeForWindow = () => {
  const {innerHeight} = window;
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


const Vista = ({dispatchEvent, temaEmpezado, title, usuario, queuedParticipants, participant, thumbsDown, thumbsUp, slack, redondear, wannaTalk}) => {

  const handleReaction = (nombre, estaReaccionado) => {
    const tipo = estaReaccionado ? reactionTypes.DESREACCIONAR : reactionTypes.REACCIONAR;
    dispatchEvent({tipo, nombre})
  };

  const onWannaTalkClick = () => {
    dispatchEvent({tipo: tipoDeEvento.HABLAR});
  };

  const onWannaStopTalkClick = () => {
    if (participant.inicio !== null && participant.fin === null) dispatchEvent({tipo: tipoDeEvento.DEJAR_DE_HABLAR});
    else dispatchEvent({tipo: tipoDeEvento.DESENCOLAR});
  };

  return (
    <MobileUsableArea fontSize={getFontSizeForWindow()}>
      <TopSectionContainer>
        <LogoHeader>
          <Logo src={logoImage}/>
          <LogoLabel> Ruth </LogoLabel>
        </LogoHeader>
        <CardInteractionsContainer>
          <SubjectTitle>
            {title}
          </SubjectTitle>
          {temaEmpezado
            ? <ReactionsContainer height={6}>
              <ReactionButton isBig isActive={thumbsUp}
                              isDisabled={thumbsDown} icon={faThumbsUp}
                              onClick={() => handleReaction(reacciones.THUMBS_UP, thumbsUp)}/>
              <ReactionButton isBig isActive={thumbsDown}
                              isDisabled={thumbsUp} icon={faThumbsDown}
                              onClick={() => handleReaction(reacciones.THUMBS_DOWN, thumbsDown)}/>
              <ReactionButton isBig isActive={slack} icon={faHashtag}
                              onClick={() => handleReaction(reacciones.SLACK, slack)}/>
              <ReactionButton isBig isActive={redondear} icon={faSync}
                              onClick={() => handleReaction(reacciones.REDONDEAR, redondear)}/>
            </ReactionsContainer>
            : <TemaNoEmpezado> El tema todavia no empezo </TemaNoEmpezado>
          }
        </CardInteractionsContainer>
      </TopSectionContainer>
      <ParticipantsContainer>
        <ParticipantsCard interactive isParticipantTalking
                          dispatch={dispatchEvent}
                          participant={participant}/>
      </ParticipantsContainer>
      <ActionContainerStyle>
        {
          temaEmpezado ? (
              !wannaTalk
                ? <div style={talkButtonStyle(false)} onClick={onWannaTalkClick}>
                  <FontAwesomeIcon icon={faMicrophoneAlt} color={'silver'} size={'2x'}/>
                </div>
                : <div style={{
                  display: 'flex', flexDirection: '', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={talkButtonStyle(true, false)} onClick={onWannaStopTalkClick}>
                    <FontAwesomeIcon icon={faMicrophoneAltSlash} color={'black'} size={'2x'}/>
                  </div>
                  <QueuedParticipants>
                    <span style={{
                      color: 'silver', fontSize: '0.9em', marginRight: '0.3em', fontFamily: "'Poppins', sans-serif",
                    }}> {queuedParticipants} </span>
                    <FontAwesomeIcon icon={faMale} color={'silver'} size={'1x'}/>
                  </QueuedParticipants>
                </div>)
            : <div style={talkButtonStyle(false)}>
              <FontAwesomeIcon icon={faMicrophoneAltSlash} color={'#ff3b3b8c'} size={'2x'}/>
            </div>
        }
      </ActionContainerStyle>
    </MobileUsableArea>
  );
}

export default Vista;
