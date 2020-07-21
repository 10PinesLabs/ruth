import Grid from "@material-ui/core/Grid";
import {ReactionButton} from "../mobile/ReactionButton";
import {faSync, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { oradorEventos} from "../store/oradores";

export const TiposReaccionAlHablar = {
    THUMBS_UP: "thumbsUp",
    THUMBS_DOWN: "thumbsDown",
    REDONDEAR: "redondeando"
}

class TalkingReactionButton extends React.Component {

    estiloGrilla = {
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: "none"
    };

    render() {
        return <Grid item xs={4} justify="center" alignItems="center" style={this.estiloGrilla}>
            <ReactionButton
                activeBackground={'#FFD152'}
                isBig
                isActive={this.props.active} icon={this.props.icon}
                onClick={this.handleReaction}/>
        </Grid>;
    }

    handleReaction = () => {
        const eventoReaccion = this.props.active ? oradorEventos.desreaccionarAOrador : oradorEventos.reaccionarAOrador;
        return this.props.onClick(eventoReaccion);
    }
}

export function TalkingReactions({dispatchEvent, participant, usuario}) {

    function onReaction(tipoReaccion) {
        return (tipoEvento) => {
            dispatchEvent(tipoEvento(tipoReaccion, usuario, participant.instanciaDeHabla));
        }
    }

    function didReact(tipoReaccion) {
        return participant.reacciones[tipoReaccion].some(({email}) =>
            usuario.email === email
        )
    }

    return <Grid container direction="column" spacing={3}
                 style={{width: "30%", alignItems: "center", alignSelf: "flex-start"}}>
        <TalkingReactionButton
            icon={faThumbsUp}
            active={didReact(TiposReaccionAlHablar.THUMBS_UP)}
            onClick={onReaction(TiposReaccionAlHablar.THUMBS_UP)}
        />
        <TalkingReactionButton
            icon={faThumbsDown}
            active={didReact(TiposReaccionAlHablar.THUMBS_DOWN)}
            onClick={onReaction(TiposReaccionAlHablar.THUMBS_DOWN)}
        />
        <TalkingReactionButton
            icon={faSync}
            active={didReact(TiposReaccionAlHablar.REDONDEAR)}
            onClick={onReaction(TiposReaccionAlHablar.REDONDEAR)}
        />
    </Grid>;
}
