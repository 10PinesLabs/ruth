import React, {useState, useEffect} from 'react';
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
import backend from '../api/backend'

const ActionItemEditor = ({onSubmit, itemDescription, itemOwners, estaEditando = false, alDescartar}) => {

  const [descripcion, setDescripcion] = useState(itemDescription || '');
  const [owners, setOwners] = useState(itemOwners || []);
  const [listaDeRoots, setListaDeRoots] = useState([])

  const limpiarInputs = () => {
    setDescripcion('');
    setOwners([]);
  }
  
  const descartar = ()=>{
    limpiarInputs();
    if(alDescartar) alDescartar()
  }

  const actualizarListaDeRoots = () =>{
    backend.getUsuarios()
      .then((roots)=>{
        setListaDeRoots(roots)})
  }

  useEffect(actualizarListaDeRoots, [])

  return (
    <Box component={ContenedorEdicionActionItem} clone boxShadow={2}>
      <ContenedorEdicionActionItem maxWidth="md">
        <ContenedorInputActionItem maxWidth="md">
          <InputActionItem value={descripcion} onChange={(event) => setDescripcion(event.target.value)} multiline label="Descripcion"/>
          <Autocomplete
            multiple
            options={listaDeRoots}
            value={owners}
            getOptionLabel={root => root.usuario}
            renderOption={root => <div>{root.usuario} ({root.nombre})</div>}
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
              onSubmit({descripcion, owners});
              limpiarInputs();
            }}>
              {estaEditando ? "Guardar" : "Crear action item"}
          </BotonCrearActionItem>
        </ContenedorBotonesActionItem>
      </ContenedorEdicionActionItem>
    </Box>
  )
};

export { ActionItemEditor };
