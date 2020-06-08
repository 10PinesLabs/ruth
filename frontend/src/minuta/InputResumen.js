import Collapse from '@material-ui/core/Collapse';
import { Card, CardContent, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { BotonParaAbrirResumen } from './Minuta.styled';

const InputResumen = ({ tema }) => {
  const [isRecapVisible, setIsRecapCollapsed] = useState(false);

  const selected = () => (tema.oradores.actual
    ? tema.oradores.actual.usuario.nombre
    : tema.oradores.pasados[tema.oradores.pasados.length - 1].usuario.nombre);

  const shouldBeVisible = () => tema.oradores.actual || tema.oradores.pasados.length > 0;

  const buttonText = () => (isRecapVisible ? 'CERRAR EDICION' : 'ABRIR EDICION');

  return (
    <>
      <BotonParaAbrirResumen
        variant="outlined"
        endIcon={<FontAwesomeIcon icon={faChevronDown}/>}
        onClick={() => setIsRecapCollapsed(!isRecapVisible)}>{buttonText()}</BotonParaAbrirResumen>
      <div>
        <Collapse in={isRecapVisible}>
          <Card>
            <CardContent>
              {shouldBeVisible() ? <p>Estas editando el resumen de: {selected()}</p>
                : <p>Nadie habló</p>}
              <TextField label="Resumen" variant="outlined" disabled={!shouldBeVisible()}/>
            </CardContent>
          </Card>
        </Collapse>
      </div>
    </>);
};

export default InputResumen;
