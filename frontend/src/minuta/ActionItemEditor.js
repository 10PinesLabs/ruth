import React, {useState} from 'react';
import {
  BotonCancelar,
  BotonCrearActionItem,
  ContenedorBotonesActionItem, ContenedorEdicionActionItem,
  ContenedorInputActionItem,
  InputActionItem,
} from './ActionItemEditor.styled';
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from "@material-ui/core";

const listaDeRoots = ['Pepe', 'Alberto', 'Luis', 'Julieta'];

const ActionItemEditor = ({onAgregarActionItem, itemDescription, itemOwners, edicion, alDescartar, alEditar}) => {

  const [descripcion, setDescripcion] = useState(itemDescription || '');
  const [owners, setOwners] = useState(itemOwners || []);

  const limpiarInputs = () => {
    setDescripcion('');
    setOwners([]);
  }
  
  const descartar = ()=>{
    limpiarInputs();
    if(alDescartar) alDescartar()
  }

  return (
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
          <BotonCancelar size="small" onClick={descartar} variant="outlined">Descartar</BotonCancelar>
          <BotonCrearActionItem
            size="small"
            onClick={() => {
              edicion ? alEditar({descripcion, owners}) : onAgregarActionItem({descripcion, owners});
              limpiarInputs();
            }}>
              {edicion ? "Guardar" : "Crear action item"}
          </BotonCrearActionItem>
        </ContenedorBotonesActionItem>
      </ContenedorEdicionActionItem>
    </Box>
  )
};

export { ActionItemEditor };
