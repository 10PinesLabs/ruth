import React, {useState} from 'react';
/*import Autocomplete from '@material-ui/lab/Autocomplete';*/
import {
  BotonCancelar,
  BotonCrearActionItem,
  ContenedorBotonesActionItem, ContenedorEdicionActionItem,
  ContenedorInputActionItem,
  InputActionItem,
} from './ActionItems.styled';

const listaDeRoots = ['Pepe', 'Alberto', 'Luis', 'Julieta'];

const ActionItems = () => (
  <>
    <h1>Action Items</h1>
    <ContenedorEdicionActionItem maxWidth="md">
      <ContenedorInputActionItem maxWidth="md">
        <InputActionItem multiline label="Descripcion"/>
        <InputActionItem label="Owners"/>
      </ContenedorInputActionItem>
      <ContenedorBotonesActionItem>
        <BotonCancelar variant="outlined">Descartar</BotonCancelar>
        <BotonCrearActionItems>Crear action item</BotonCrearActionItems>
      </ContenedorBotonesActionItem>
    </ContenedorEdicionActionItem>
  </>
);

export default ActionItems;
