import React, {useState} from 'react';
import {OrdenesTabla, TablaPinos} from './Minuta.styled';
import Button from "@material-ui/core/Button";
import {ExpandMore, Timer} from "@material-ui/icons";
import {TablaOradores} from "./TablaOradores";

export const cantidadReaccionesDelPino = (tipoReaccion,pino) => {
  return pino.reacciones[tipoReaccion].length;
}

const ListaPinosQueHablaron = ({oradores}) => {
  let [ordenAscendiente, setOrdenAscendiente] = useState(true);
  
  return (
    <>
      <OrdenesTabla>
        <Button
          variant="outlined"
          color="primary"
          startIcon={(ordenAscendiente) ? <Timer/> : <ExpandMore/>}
          onClick={() => setOrdenAscendiente(!ordenAscendiente)}
        >
          {(ordenAscendiente) ? "Orden cronolgico" : "Mas recientes"}
        </Button>
      </OrdenesTabla>
      <TablaPinos>
        
        <TablaOradores
          ordenAscendiente={ordenAscendiente} 
          oradores={oradores}
        />
      </TablaPinos>
    </>
  );
}

export default ListaPinosQueHablaron;
