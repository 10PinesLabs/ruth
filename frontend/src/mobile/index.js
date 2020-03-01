import React from 'react';
import { connect } from 'react-redux';
import Vista from './vista';

const Mobile = ({
  idTema, usuario, dispatch, ...props
}) => {
  const dispatchEvent = (data) => {
    if (idTema) {
      const evento = {
        autor: 'MOBILE',
        fecha: Date.now(),
        idTema,
        usuario,
        data,
      };
      dispatch(evento);
    }
  };

  return (
    <>
        <Vista dispatchEvent={dispatchEvent} {...props}/>
    </>
  );
};


const mapStateToProps = (state) => {
  const tema = state.temas.find((t) => t.fin === null && t.inicio !== null);
  const title = tema && tema.titulo;
  const participant = tema && tema.oradores && tema.oradores.find((orador) => orador.inicio !== null && orador.fin === null);
  const queuedParticipants = (tema && tema.oradores && tema.oradores.filter((orador) => orador.inicio === null).length) || 0;
  return {
    idTema: tema && tema.id,
    title,
    participant,
    queuedParticipants,
    temaEmpezado: tema && tema.inicio
  };
};

export default connect(mapStateToProps)(Mobile);
