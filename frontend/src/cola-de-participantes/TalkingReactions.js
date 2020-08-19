import  Grid from "@material-ui/core/Grid";
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
        return (
            <ReactionButton
                activeBackground={'#FFD152'}
                isBig={true}
                isActive={this.props.active} icon={this.props.icon}
                onClick={this.handleReaction}/>
        )
    }

    handleReaction = () => {
        const creadorDeEventoReaccion = this.props.active ? oradorEventos.desreaccionarAOrador : oradorEventos.reaccionarAOrador;
        return this.props.onClick(creadorDeEventoReaccion);
    }
}

export function TalkingReactions({dispatch, participant, usuario, tema}) {

    function onReaction(tipoReaccion) {
        return (tipoEvento) => {
            dispatch(tipoEvento(tipoReaccion, usuario, participant.instanciaDeHabla, tema.id));
        }
    }

    function didReact(tipoReaccion) {
        return participant.reacciones[tipoReaccion].some(({email}) =>
            usuario.email === email
        )
    }

    return (
      <Grid
        container
        direction="row"
        style={{
          justifyContent: "space-evenly",
          padding: "13px 0",
        }}
      >
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
    </Grid>
    );
}
