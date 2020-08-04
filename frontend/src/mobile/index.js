import React from 'react';
import { connect } from 'react-redux';
import Vista from './vista';
import { reacciones } from './actions';

const Mobile = ({
  usuario, dispatch, tema, queuedParticipants, ...props
}) => {
  const dispatchEvent = (data) => {
    if (tema.id) {
      const evento = {
        autor: 'MOBILE',
        fecha: Date.now(),
        idTema: tema.id,
        usuario,
        data,
      };
      dispatch(evento);
    }
  };
  const esUsuarioActual = (evento) => evento.usuario.email === usuario.email;

  const remainingParticipantsUpToUser = (queuedParticipants) => {
    return queuedParticipants.map(participant => participant.usuario.email).indexOf(usuario.email) + 1;
  }

  const reaccionoCon = (reaccion) => {
    if (!tema) {
      return false;
    }

    if (!tema.reacciones[reaccion]) {
      return false;
    }
    return tema.reacciones[reaccion].indexOf(usuario.email) >= 0;
  };

  return (
    <>
      <Vista
        {...props}
        remainingParticipantsUpToUser={(queuedParticipants && remainingParticipantsUpToUser(queuedParticipants)) || 0}
        queuedParticipants={queuedParticipants}
        usuario={usuario}
        dispatchEvent={dispatchEvent}
        wannaTalk={Boolean(tema && tema.oradores.cola.find(esUsuarioActual))}
        isTalking={Boolean(tema && tema.oradores.actual && esUsuarioActual(tema.oradores.actual))}
        thumbsUp={reaccionoCon(reacciones.THUMBS_UP)}
        thumbsDown={reaccionoCon(reacciones.THUMBS_DOWN)}
        slack={reaccionoCon(reacciones.SLACK)}
        redondear={reaccionoCon(reacciones.REDONDEAR)}
        tema={tema}/>
    </>
  );
};


const mapStateToProps = (state) => {
  const tema = state.temas.find((t) => t.fin === null && t.inicio !== null);
  const title = tema && tema.titulo;
  const participant = tema && tema.oradores.actual;
  const queuedParticipants = tema && tema.oradores.cola;
  return {
    title,
    participant,
    queuedParticipants,
    temaEmpezado: tema && tema.inicio,
    tema,
  };
};

export default connect(mapStateToProps)(Mobile);
