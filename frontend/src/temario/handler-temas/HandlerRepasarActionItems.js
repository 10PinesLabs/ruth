import React from 'react';
import DescripcionActionItems from '../descripcion-tipo-tema/DescripcionActionItems';

const HandlerRepasarActionItems = {
  canHandle(tipoTema) {
    return tipoTema === 'repasarActionItems';
  },
  handleTema(tema) {
    return <DescripcionActionItems tema={tema}/>;
  },
};

export default HandlerRepasarActionItems;
