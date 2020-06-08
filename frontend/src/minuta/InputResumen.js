import Collapse from '@material-ui/core/Collapse';
import { Card, CardContent, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const InputResumen = ({ tema }) => {
  const [isRecapVisible, setIsRecapCollapsed] = useState(false);

  return (<div>
    <button onClick={() => setIsRecapCollapsed(!isRecapVisible)}>Editar resumen</button>
    <Collapse in={isRecapVisible}>
      <Card>
        <CardContent>
          {tema.oradores.actual ? <p>Estas editando el resumen de: {tema.oradores.actual.usuario.nombre}</p>
            : <p>Nadie esta hablando</p>}
          <TextField label="Resumen" variant="outlined" disabled={tema.oradores.actual == null}/>
        </CardContent>
      </Card>
    </Collapse>
  </div>);
};

export default InputResumen;
