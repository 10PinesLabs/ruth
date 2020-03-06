import React from 'react';
import { connect } from 'react-redux';
import Vista from './vista';

export const reacciones = {
  REDONDEAR: '🔄',
  SLACK: '💬',
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
};

const Mobile = ({
  usuario, dispatch, tema, ...props
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
  const reaccionoCon = (reaccion) => Boolean(tema && tema.reacciones.filter((r) => r.nombre === reaccion).find(esUsuarioActual));
  console.log(tema && tema.oradores);
  return (
    <>
      <Vista {...props}
        usuario={usuario}
             dispatchEvent={dispatchEvent}
             wannaTalk={Boolean(tema && tema.oradores.filter((orador) => orador.fin === null).find(esUsuarioActual))}
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
