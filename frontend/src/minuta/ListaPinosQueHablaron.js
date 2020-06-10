import React from 'react';
import {TablaPinos} from './Minuta.styled';
import {TablaOradores} from "./TablaOradores";

export const cantidadReaccionesDelPino = (tipoReaccion,pino) => {
  return pino.reacciones[tipoReaccion].length;
}

const ListaPinosQueHablaron = ({oradores, finTema, onSelect}) => {
  
  return (
    <>
      <TablaPinos>
        <TablaOradores
          oradores={oradores}
          finTema={finTema}
          onSelect={onSelect}
        />
      </TablaPinos>
    </>
  );
}

export default ListaPinosQueHablaron;
