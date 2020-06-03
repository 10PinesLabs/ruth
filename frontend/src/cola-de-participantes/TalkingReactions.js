import Grid from "@material-ui/core/Grid";
import {ReactionButton} from "../mobile/ReactionButton";
import {faSync, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import * as PropTypes from "prop-types";
import React from "react";

export function TalkingReactions({dispatchEvent, participant}) {

    const estiloGrilla = {
        display: "flex",
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: "none"
    }
    const backgroundActivo = 'linear-gradient(90deg, rgba(220,223,3,1) 0%, rgba(255,252,184,1) 100%)'

    const backgroundInactivo = 'linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(187,187,186,1) 97%)'


    function onReaction(reactionString) {
        return () => {
            dispatchEvent({
                tipo: "ReaccionAPersona",
                usuarioOrador: {
                    nombre: participant.usuario.nombre,
                    email: participant.usuario.email,
                },
                instanciaDeHabla: participant.instanciaDeHabla,
                reaccion: reactionString
            });
        }
    }

    return <Grid container direction="column" spacing={3}
                 style={{width: "30%", alignItems: "center", alignSelf: "flex-start"}}>
        <Grid item xs={4} justify="center" alignItems="center" style={estiloGrilla}>
            <ReactionButton
                background={backgroundInactivo}
                isBig
                isActive={true} icon={faThumbsUp}
                onClick={onReaction("thumbsUp")}/>
        </Grid>
        <Grid item xs={4} justify="center" alignItems="center" style={estiloGrilla}>
            <ReactionButton
                background={backgroundInactivo}
                isBig
                isActive={true} icon={faThumbsDown}
                onClick={onReaction("thumbsDown")}/>
        </Grid>
        <Grid item xs={4} justify="center" alignItems="center" style={estiloGrilla}>
            <ReactionButton
                background={backgroundInactivo}
                isBig
                isActive={true} icon={faSync}
                onClick={onReaction("redondeando")}/>
        </Grid>
    </Grid>;
}

TalkingReactions.propTypes = {
    style: PropTypes.shape({display: PropTypes.string, paddingRight: PropTypes.number, paddingLeft: PropTypes.number}),
    background: PropTypes.string,
    onClick: PropTypes.func
};