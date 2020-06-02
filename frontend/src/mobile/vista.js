import React, {useEffect, useState} from 'react';
import {
    faHashtag,
    faMale,
    faMicrophoneAlt,
    faSync,
    faThumbsDown,
    faThumbsUp,
    faHandPaper,
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
    MicrophoneContainer,
    ParticipantsCounter,
    TalkButton,
    ReactionsContainer,
} from './vista.styled';
import {tipoDeEvento} from '../store/oradores';
import {CardInteractionsContainer} from '../components/InteractionsContainer.styled';
import {reactionTypes} from '../store/reacciones';
import {SkeletonCircle, SkeletonLine, ReactionSkeletonContainer} from '../skeleton/Skeleton.styled';
import {reacciones} from './actions';

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


const Vista = ({
                   dispatchEvent,
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
               }) => {
    const handleReaction = (nombre, estaReaccionado) => {
        const tipo = estaReaccionado ? reactionTypes.DESREACCIONAR : reactionTypes.REACCIONAR;
        dispatchEvent({tipo, nombre});
    };

    const onWannaTalkClick = () => {
        dispatchEvent({tipo: tipoDeEvento.LEVANTAR_MANO});
    };

    const onWannaStopTalkClick = () => {
        const estoyHablando = participant.usuario.email === usuario.email;
        if (estoyHablando) dispatchEvent({tipo: tipoDeEvento.DEJAR_DE_HABLAR});
        else dispatchEvent({tipo: tipoDeEvento.DESENCOLAR});
    };

    const kickear = (usuario) => {
        dispatchEvent({tipo: tipoDeEvento.KICKEAR, kickearA: usuario});
    };

    const [showSkeleton, setShowSekelton] = useState(true);
    useEffect(() => {
        setTimeout(() => setShowSekelton(false), 1000);
    }, []);

    const inQueueIcon = () => (isTalking ? faMicrophoneAlt : faHandPaper);

    let botonesDeReaccion;
    if (temaEmpezado) {
        botonesDeReaccion = (
            <ReactionsContainer height={6}>
                <ReactionButton
                    isBig isActive={thumbsUp}
                    isDisabled={thumbsDown} icon={faThumbsUp}
                    onClick={() => handleReaction(reacciones.THUMBS_UP, thumbsUp)}/>
                <ReactionButton
                    isBig isActive={thumbsDown}
                    isDisabled={thumbsUp} icon={faThumbsDown}
                    onClick={() => handleReaction(reacciones.THUMBS_DOWN, thumbsDown)}/>
                <ReactionButton
                    isBig isActive={slack} icon={faHashtag}
                    onClick={() => handleReaction(reacciones.SLACK, slack)}/>
                <ReactionButton
                    isBig isActive={redondear} icon={faSync}
                    onClick={() => handleReaction(reacciones.REDONDEAR, redondear)}/>
            </ReactionsContainer>
        );
    } else {
        botonesDeReaccion = <TemaNoEmpezado> El tema todavia no empezo </TemaNoEmpezado>;
    }

    let microphone;
    if (temaEmpezado) {
        if (isTalking) {
            microphone =
                <MicrophoneContainer>
                    <TalkButton pressed={true} onClick={onWannaStopTalkClick}>
                        <FontAwesomeIcon icon={inQueueIcon()} color={'black'} size={'2x'}/>
                    </TalkButton>
                </MicrophoneContainer>;
        } else if (wannaTalk) {
            microphone =
                <MicrophoneContainer>
                    <TalkButton pressed={true} onClick={onWannaStopTalkClick}>
                        <FontAwesomeIcon icon={inQueueIcon()} color={'black'} size={'2x'}/>
                    </TalkButton>
                    <QueuedParticipants>
                        <ParticipantsCounter>
                            {remainingParticipantsUpToUser}
                        </ParticipantsCounter>
                        <FontAwesomeIcon icon={faMale} color={'silver'} size={'1x'}/>
                    </QueuedParticipants>
                </MicrophoneContainer>;
        } else {
            microphone = <TalkButton pressed={false} onClick={onWannaTalkClick}>
                <FontAwesomeIcon icon={faHandPaper} color={'gray'} size={'2x'}/>
            </TalkButton>;
        }
    } else {
        microphone = <TalkButton pressed={false}>
            <FontAwesomeIcon icon={faHandPaper} color={'#ff3b3b8c'} size={'2x'}/>
        </TalkButton>;
    }


    return (
        <MobileUsableArea fontSize={getFontSizeForWindow()}>
            <TopSectionContainer>
                <LogoHeader>
                    <Logo src={logoImage}/>
                    <LogoLabel> Ruth </LogoLabel>
                </LogoHeader>
                <CardInteractionsContainer>
                    <SubjectTitle>
                        {showSkeleton ? <SkeletonLine/> : title}
                    </SubjectTitle>
                    {showSkeleton
                        ? <ReactionsContainer height={6}>
                            <ReactionSkeletonContainer><SkeletonCircle/></ReactionSkeletonContainer>
                            <ReactionSkeletonContainer><SkeletonCircle/></ReactionSkeletonContainer>
                            <ReactionSkeletonContainer><SkeletonCircle/></ReactionSkeletonContainer>
                            <ReactionSkeletonContainer><SkeletonCircle/></ReactionSkeletonContainer>
                        </ReactionsContainer>
                        : botonesDeReaccion
                    }
                </CardInteractionsContainer>
            </TopSectionContainer>
            <ParticipantsContainer>
                <ParticipantsCard
                    interactive
                    isParticipantTalking
                    dispatchEvent={dispatchEvent}
                    kickear={kickear}
                    participant={participant}/>
            </ParticipantsContainer>
            <ActionContainerStyle>
                {showSkeleton ? <TalkButton pressed={false}><SkeletonCircle/></TalkButton> : microphone}
            </ActionContainerStyle>
        </MobileUsableArea>
    );
};

export default Vista;

