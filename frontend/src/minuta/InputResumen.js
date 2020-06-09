import Collapse from '@material-ui/core/Collapse';
import { Card, CardContent, TextField } from '@material-ui/core';
import React from 'react';

const InputResumen = ({ oradores, isRecapVisible }) => {

  const selected = () => (oradores.actual
    ? oradores.actual.usuario.nombre
    : oradores.pasados[oradores.pasados.length - 1].usuario.nombre);

  const shouldBeDisabled = () => !(oradores.actual || oradores.pasados.length > 0);

  return (
    <>

      <div>
        <Collapse in={isRecapVisible}>
          <Card>
            <CardContent>
              {!shouldBeDisabled() ? <p>Estas editando el resumen de: {selected()}</p>
                : <p>Nadie habló</p>}
              <TextField label="Resumen" variant="outlined" disabled={shouldBeDisabled()}/>
            </CardContent>
          </Card>
        </Collapse>
      </div>
    </>);
};

export default InputResumen;
