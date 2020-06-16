import React, {useState} from 'react';
/*import Autocomplete from '@material-ui/lab/Autocomplete';*/
import {
  BotonCancelar,
  BotonCrearActionItem,
  ContenedorBotonesActionItem, ContenedorEdicionActionItem,
  ContenedorInputActionItem,
  InputActionItem,
} from './ActionItems.styled';
import {tipoDeEvento} from "../store/actionItem";

const listaDeRoots = ['Pepe', 'Alberto', 'Luis', 'Julieta'];

const ActionItems = ({tema, dispatch}) => {

  const [descripcion, setDescripcion] = useState('');
  const [owners, setOwners] = useState('');

  const dispatchActionItem = (data) => {
    const evento = {
      autor: "MINUTEADOR",
      idTema: tema.id,
      data,
    };
    dispatch(evento);
  }

  const agregarActionItem = () => {
    const actionItem = {
      descripcion,
      owners,
    }
    dispatchActionItem({
      tipo: tipoDeEvento.AGREGAR_ACTION_ITEM,
      actionItem,
    })

  };

  return (
    <>
    <h1>Action Items</h1>
      <ContenedorEdicionActionItem maxWidth="md">
        <ContenedorInputActionItem maxWidth="md">
          <InputActionItem value={descripcion} onChange={(event) => setDescripcion(event.target.value)} multiline label="Descripcion"/>
          <InputActionItem value={owners} onChange={(event) => setOwners(event.target.value)} label="Owners"/>
        </ContenedorInputActionItem>
        <ContenedorBotonesActionItem>
          <BotonCancelar variant="outlined">Descartar</BotonCancelar>
          <BotonCrearActionItem onClick={agregarActionItem}>Crear action item</BotonCrearActionItem>
        </ContenedorBotonesActionItem>
      </ContenedorEdicionActionItem>
    </>
  )
};

export default ActionItems;
