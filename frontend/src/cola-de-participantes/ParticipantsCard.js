import React, {useEffect, useState} from 'react';
import ParticipantCounter from './ParticipantCounter';
import {
    CardContainer,
    CardInfoContainer,
    CardName,
    Cerrar,
    ParticipantDataReactableContainer,
    UserAvatar,
} from './ParticipantsCard.styled';
import getGravatarUrlFor from '../api/gravatar';
import {SkeletonBlock, SkeletonLine} from "../skeleton/Skeleton.styled";
import {ModalDeConfirmacion} from "../tipos-vista-principal/Modal";
import {TalkingReactions} from "./TalkingReactions";

const ParticipantData = (props) => {
    return <>
        <UserAvatar isTalking={props.talking} avatar={getGravatarUrlFor(props.usuario.email)}/>
        <CardInfoContainer>
            <CardName isInteractive={props.interactive}> {props.usuario.nombre} </CardName>
            <ParticipantCounter isInteractive={props.interactive} estadoOrador={props.estadoOrador}/>
        </CardInfoContainer>
    </>;
}

const ParticipantsCard = ({sePuedeReaccionar = false, dispatchEvent, participant, isParticipantTalking, interactive, kickear, finTema, usuario}) => {
    const estadoOrador = () => {
        if (estaEncolado()) {
            return {detalle: 'encolado'};
        }
        if (hablo()) {
            return {detalle: 'hablo', seconds: Math.ceil((participant.fin - participant.inicio) / 1000)};
        }
        return {
            detalle: finTema ? 'hablo' : 'hablando',
            seconds: Math.ceil(((Date.parse(finTema) || Date.now()) - participant.inicio) / 1000)
        };
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

    return showSkeleton ?
        <SkeletonComponent interactive isParticipantTalking={isParticipantTalking}/> : (participant ? (

            <CardContainer
                sePuedeReaccionar={sePuedeReaccionar}
                isInteractive={interactive}
                isTalking={isParticipantTalking}
            >
                {interactive && <Cerrar onClick={() => setOradorAKickear(participant.usuario)}/>}
                <ModalDeConfirmacion
                    title={`¿Estás seguro que querés kickear a ${oradorAKickear && oradorAKickear.nombre || ''}?`}
                    open={Boolean(oradorAKickear)}
                    confirmText={"Si"}
                    cancelText={"No"}
                    onClose={() => setOradorAKickear(null)} onConfirm={() => kickear(oradorAKickear)}/>

                {(sePuedeReaccionar) ?
                    <>
                        <TalkingReactions
                            usuario={usuario}
                            dispatchEvent={dispatchEvent}
                            participant={participant}
                        />
                        <ParticipantDataReactableContainer>
                            <ParticipantData
                                talking={isParticipantTalking}
                                usuario={participant.usuario}
                                interactive={interactive}
                                estadoOrador={estadoOrador()}/>
                        </ParticipantDataReactableContainer>
                    </> :
                    <ParticipantData
                        talking={isParticipantTalking}
                        usuario={participant.usuario}
                        interactive={interactive}
                        estadoOrador={estadoOrador()}
                    />
                }

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
