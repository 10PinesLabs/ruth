import React from 'react';
import { connect } from 'react-redux';
import Vista from './vista';

const Mobile = ({ usuario, dispatch, tema, ...props }) => {
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
  const wannaTalk = Boolean(tema && tema.oradores.find(orador => orador.usuario.email === usuario.email));
  const thumbsUp = Boolean(tema && tema.reacciones.filter(r => r.nombre === '👍').find(reaccion => reaccion.usuario.email === usuario.email));
  const thumbsDown = Boolean(tema && tema.reacciones.filter(r => r.nombre === '👎').find(reaccion => reaccion.usuario.email === usuario.email));
  const slack = Boolean(tema && tema.reacciones.filter(r => r.nombre === '💬').find(reaccion => reaccion.usuario.email === usuario.email));
  const redondear = Boolean(tema && tema.reacciones.filter(r => r.nombre === '🔄').find(reaccion => reaccion.usuario.email === usuario.email));

  return (
    <>
        <Vista {...props}
               dispatchEvent={dispatchEvent}
               wannaTalk={wannaTalk}
               thumbsUp={thumbsUp}
               thumbsDown={thumbsDown}
               slack={slack}
               redondear={redondear}
               tema={tema} />
    </>
  );
};


const mapStateToProps = (state) => {
  const tema = state.temas.find((t) => t.fin === null && t.inicio !== null);
  const title = tema && tema.titulo;
  const participant = tema && tema.oradores && tema.oradores.find((orador) => orador.inicio !== null && orador.fin === null);
  const queuedParticipants = (tema && tema.oradores && tema.oradores.filter((orador) => orador.inicio === null).length) || 0;
  return {
    title,
    participant,
    queuedParticipants,
    temaEmpezado: tema && tema.inicio,
    tema,
  };
};

export default connect(mapStateToProps)(Mobile);
