import Collapse from '@material-ui/core/Collapse';
import { Card, CardContent, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const InputResumen = ({ tema }) => {
  const [isRecapVisible, setIsRecapCollapsed] = useState(false);

  function selected() {
    return tema.oradores.actual
      ? tema.oradores.actual.usuario.nombre
      : tema.oradores.pasados[tema.oradores.pasados.length - 1].usuario.nombre;
  }

  function shouldBeVisible() {
    return tema.oradores.actual || tema.oradores.pasados.length > 0;
  }

  return (<div>
    <button onClick={() => setIsRecapCollapsed(!isRecapVisible)}>Editar resumen</button>
    <Collapse in={isRecapVisible}>
      <Card>
        <CardContent>
          {shouldBeVisible() ? <p>Estas editando el resumen de: {selected()}</p>
            : <p>Nadie habló</p>}
          <TextField label="Resumen" variant="outlined" disabled={!shouldBeVisible()}/>
        </CardContent>
      </Card>
    </Collapse>
  </div>);
};

export default InputResumen;
