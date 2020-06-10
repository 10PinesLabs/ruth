import React from 'react';
import {TablaPinos} from './Minuta.styled';
import {TablaOradores} from "./TablaOradores";

export const cantidadReaccionesDelPino = (tipoReaccion,pino) => {
  return pino.reacciones[tipoReaccion].length;
}

const ListaPinosQueHablaron = ({oradores}) => {
  
  return (
    <>
      <TablaPinos>
        <TablaOradores
          oradores={oradores}
        />
      </TablaPinos>
    </>
  );
}

export default ListaPinosQueHablaron;
