import Grid from "@material-ui/core/Grid";
import {ReactionButton} from "../mobile/ReactionButton";
import {faSync, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {tipoDeEvento} from "../store/oradores";

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
    }
    backgroundActivo = 'linear-gradient(90deg, rgba(220,223,3,1) 0%, rgba(255,252,184,1) 100%)'

    backgroundInactivo = 'linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(187,187,186,1) 97%)'

    render() {
        return <Grid item xs={4} justify="center" alignItems="center" style={this.estiloGrilla}>
            <ReactionButton
                inactiveBackground={this.backgroundInactivo}
                activeBackground={this.backgroundActivo}
                isBig
                isActive={this.props.active} icon={this.props.icon}
                onClick={this.handleReaction}/>
        </Grid>;
    }

    handleReaction = () => {
        const tipoReaccion = this.props.active ? tipoDeEvento.DESREACCIONAR_A_ORADOR : tipoDeEvento.REACCIONAR_A_ORADOR;
        return this.props.onClick(tipoReaccion);
    }
}

export function TalkingReactions({dispatchEvent, participant, usuario}) {

    function onReaction(tipoReaccion) {
        return (tipoEvento) => {
            dispatchEvent({
                tipo: tipoEvento,
                usuarioOrador: {
                    nombre: participant.usuario.nombre,
                    email: participant.usuario.email,
                },
                instanciaDeHabla: participant.instanciaDeHabla,
                reaccion: tipoReaccion
            });
        }
    }

    function didReact(tipoReaccion) {
        return participant.reacciones.some(({usuarioQueReacciona,reaccion, tipo}) =>
            usuarioQueReacciona.email === usuario.email &&
            reaccion === tipoReaccion &&
            tipo === tipoDeEvento.REACCIONAR_A_ORADOR
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