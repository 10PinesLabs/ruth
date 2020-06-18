import React, {useState} from 'react';
import {
  BotonCancelar,
  BotonCrearActionItem,
  ContenedorBotonesActionItem, ContenedorEdicionActionItem,
  ContenedorInputActionItem,
  InputActionItem,
} from './ActionItems.styled';
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from "@material-ui/core";

const listaDeRoots = ['Pepe', 'Alberto', 'Luis', 'Julieta'];

const ActionItems = ({tema, dispatch, onAgregarActionItem}) => {

  const [descripcion, setDescripcion] = useState('');
  const [owners, setOwners] = useState([]);

  const limpiarInputs = () => {
    setDescripcion('');
    setOwners([]);
  }

  return (
    <>
    <h1>Action Items</h1>
      <Box component={ContenedorEdicionActionItem} clone boxShadow={2}>
        <ContenedorEdicionActionItem maxWidth="md">
          <ContenedorInputActionItem maxWidth="md">
            <InputActionItem value={descripcion} onChange={(event) => setDescripcion(event.target.value)} multiline label="Descripcion"/>
            <Autocomplete
              multiple
              options={listaDeRoots}
              value={owners}
              onChange={(event, value) => setOwners(value)}
              renderInput={params => (
                <TextField {...params}
                placeholder="Owners"
                margin="normal"
                fullWidth/>
              )
              }/>
          </ContenedorInputActionItem>
          <ContenedorBotonesActionItem>
            <BotonCancelar size="small" onClick={limpiarInputs} variant="outlined">Descartar</BotonCancelar>
            <BotonCrearActionItem
              size="small"
              onClick={() => {
                onAgregarActionItem({descripcion, owners});
                limpiarInputs();
              }}>Crear action item</BotonCrearActionItem>
          </ContenedorBotonesActionItem>
        </ContenedorEdicionActionItem>
      </Box>
    </>
  )
};

export default ActionItems;
