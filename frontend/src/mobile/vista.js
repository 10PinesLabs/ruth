import React from 'react';
import {
  faThumbsUp, faThumbsDown, faHashtag, faSync, faMicrophoneAlt, faMicrophoneAltSlash, faMale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ParticipantsCard from '../cola-de-participantes/ParticipantsCard';
import { ReactionButton } from './ReactionButton';
import {
  MobileUsableArea,
  ParticipantsContainer,
  SubjectTitle,
  ActionContainerStyle,
  LogoHeader,
  LogoLabel,
  Logo,
  TopSectionContainer, QueuedParticipants,
} from './vista.styled';
import { ReactionsContainer } from '../components/SubjectReactionsContainer.styled';
import { CardInteractionsContainer } from '../components/InteractionsContainer.styled';

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

class Vista extends React.Component {
  state = {
    subjectThumbsUpClicked: false,
    subjectThumbsDownClicked: false,
    subjectSlackClicked: false,
    subjectRecommendingEndingClicked: false,
    wannaTalk: false,
  };

  onSubjectThumbsUpClick = () => {
    this.props.dispatchEvent({ tipo: 'Reaccionar', reaccion: 'thumbsUpTemaActual👍' });
    this.setState({ subjectThumbsUpClicked: true, subjectThumbsDownClicked: false });
  };

  onSubjectThumbsDownClick = () => {
    this.props.dispatchEvent({ tipo: 'Reaccionar', reaccion: 'thumbsDownTemaActual' });
    this.setState({ subjectThumbsUpClicked: false, subjectThumbsDownClicked: true });
  };

  onSubjectSlackClick = () => {
    this.props.dispatchEvent({ tipo: 'Reaccionar', reaccion: 'slackTemaActual' });
    this.setState({ subjectSlackClicked: !this.state.subjectSlackClicked });
  };

  onSubjectRecommendingEndingClicked = () => {
    this.props.dispatchEvent({ tipo: 'Reaccionar', reaccion: 'redondearTemaActual' });
    this.setState({ subjectRecommendingEndingClicked: !this.state.subjectRecommendingEndingClicked });
  };

  onWannaTalkClick = () => {
    this.props.dispatchEvent({ tipo: 'Quiero Hablar' });
    this.setState({ wannaTalk: true });
  };

  onWannaStopTalkClick = () => {
    this.props.dispatchEvent({tipo: 'Quiero Desencolarme'});
    this.setState({wannaTalk: false});
  }

  render() {
    return (
      <MobileUsableArea fontSize={getFontSizeForWindow()}>
        <TopSectionContainer>
          <LogoHeader>
            <Logo src={logoImage}/>
            <LogoLabel> Ruth </LogoLabel>
          </LogoHeader>
          <CardInteractionsContainer height={'25%'} width={'95%'}>
            <SubjectTitle>
              {this.props.title}
            </SubjectTitle>
            <ReactionsContainer height={6}>
              <ReactionButton isBig isActive={this.state.subjectThumbsUpClicked}
                              isDisabled={this.state.subjectThumbsDownClicked} icon={faThumbsUp}
                              onClick={this.onSubjectThumbsUpClick} />
              <ReactionButton isBig isActive={this.state.subjectThumbsDownClicked}
                              isDisabled={this.state.subjectThumbsUpClicked} icon={faThumbsDown}
                              onClick={this.onSubjectThumbsDownClick} />
              <ReactionButton isBig isActive={this.state.subjectSlackClicked} icon={faHashtag}
                              onClick={this.onSubjectSlackClick} />
              <ReactionButton isBig isActive={this.state.subjectRecommendingEndingClicked} icon={faSync}
                              onClick={this.onSubjectRecommendingEndingClicked} />
            </ReactionsContainer>
          </CardInteractionsContainer>
        </TopSectionContainer>
        <ParticipantsContainer>
          <ParticipantsCard interactive isParticipantTalking
                            dispatch={this.props.dispatchEvent}
                            participant={this.props.participant} />
        </ParticipantsContainer>
        <ActionContainerStyle>
          {
            !this.state.wannaTalk
              ? <div style={talkButtonStyle(false)} onClick={this.onWannaTalkClick}>
                <FontAwesomeIcon icon={faMicrophoneAlt} color={'silver'} size={'2x'} />
              </div>
              : <div style={{
                display: 'flex', flexDirection: '', alignItems: 'center', justifyContent: 'center',
              }}>
                  <div style={talkButtonStyle(true, false)} onClick={this.onWannaStopTalkClick}>
                    <FontAwesomeIcon icon={faMicrophoneAltSlash} color={'black'} size={'2x'} />
                  </div>
                  <QueuedParticipants>
                    <span style={{
                      color: 'silver', fontSize: '0.9em', marginRight: '0.3em', fontFamily: "'Poppins', sans-serif",
                    }}> {this.props.queuedParticipants} </span>
                    <FontAwesomeIcon icon={faMale} color={'silver'} size={'1x'} />
                  </QueuedParticipants>
              </div>
          }
        </ActionContainerStyle>
      </MobileUsableArea>
    );
  }
}
export default Vista;
