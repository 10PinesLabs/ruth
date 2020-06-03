import Grid from "@material-ui/core/Grid";
import {ReactionButton} from "../mobile/ReactionButton";
import {faSync, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import * as PropTypes from "prop-types";
import React from "react";
import {tipoDeEvento} from "../store/oradores";

export const TiposReaccionAlHablar = {
    THUMBS_UP: "thumbsUp",
    THUMBS_DOWN: "thumbsDown",
    REDONDEAR: "redondeando"
}

class TalkingReactionButton extends React.Component {

    state = {selected: false}

    estiloGrilla = {
        display: "flex",
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: "none"
    }
    backgroundActivo = 'linear-gradient(90deg, rgba(220,223,3,1) 0%, rgba(255,252,184,1) 100%)'

    backgroundInactivo = 'linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(187,187,186,1) 97%)'

    render() {
        return <Grid item xs={4} justify="center" alignItems="center" style={this.estiloGrilla}>
            <ReactionButton
                background={this.backgroundInactivo}
                activeBackground={this.backgroundActivo}
                isBig
                isActive={this.props.active} icon={this.props.icon}
                onClick={this.handleReaction}/>
        </Grid>;
    }

    handleReaction = () => {
        const tipoReaccion = this.state.selected ? tipoDeEvento.DESREACCIONARAPERSONA : tipoDeEvento.REACCIONARAPERSONA;

        this.setState({selected: !this.state.selected});

        return this.props.onClick(tipoReaccion);
    }
}

export function TalkingReactions({dispatchEvent, participant, usuario}) {

    function onReaction(reactionString) {
        return (tipoReaccion) => {
            dispatchEvent({
                tipo: tipoReaccion,
                usuarioOrador: {
                    nombre: participant.usuario.nombre,
                    email: participant.usuario.email,
                },
                instanciaDeHabla: participant.instanciaDeHabla,
                reaccion: reactionString
            });
        }
    }

    function didReact(tipoReaccion) {
        return participant.reacciones.some(({usuarioQueReacciona,reaccion, tipo}) =>
            usuarioQueReacciona.email === usuario.email &&
            reaccion === tipoReaccion &&
            tipo === tipoDeEvento.REACCIONARAPERSONA
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

TalkingReactions.propTypes = {
    style: PropTypes.shape({display: PropTypes.string, paddingRight: PropTypes.number, paddingLeft: PropTypes.number}),
    background: PropTypes.string,
    onClick: PropTypes.func
};