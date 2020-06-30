import React, {useState, useEffect} from 'react';
import {
  BotonCancelar,
  BotonEnviar,
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
  const [usuarios, setUsuarios] = useState([])

  const limpiarInputs = () => {
    setDescripcion('');
    setOwners([]);
  }
  
  const descartar = ()=>{
    limpiarInputs();
    if(alDescartar) alDescartar()
  }

  const guardar = () => {
    let actionItem = {descripcion, owners}
    if(esUnActionItem(actionItem)){
      onSubmit(actionItem);
      limpiarInputs();
    }
  }

  const esUnActionItem = (actionItem) => {
    return actionItemTieneDescripcion(actionItem) && actionItemTieneAlMenosUnOwner(actionItem)
  }

  const actionItemTieneDescripcion = ({descripcion}) => {
    return descripcion
  }

  const actionItemTieneAlMenosUnOwner = ({owners}) => {
    return owners.length>0
  }

  const actualizarUsuarios = () =>{
    backend.getUsuarios()
      .then((usuarios)=>{
        setUsuarios(usuarios)})
  }

  useEffect(actualizarUsuarios, [])

  return (
    <Box component={ContenedorEdicionActionItem} clone boxShadow={2}>
      <ContenedorEdicionActionItem maxWidth="md">
        <ContenedorInputActionItem maxWidth="md">
          <InputActionItem value={descripcion} onChange={(event) => setDescripcion(event.target.value)} multiline label="Descripcion"/>
          <Autocomplete
            multiple
            options={usuarios}
            value={owners}
            getOptionLabel={usuario => usuario.usuario}
            renderOption={usuario => <div>{usuario.usuario} ({usuario.nombre})</div>}
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
          <BotonEnviar
            size="small"
            onClick={guardar}>
              {estaEditando ? "Guardar" : "Crear action item"}
          </BotonEnviar>
        </ContenedorBotonesActionItem>
      </ContenedorEdicionActionItem>
    </Box>
  )
};

export { ActionItemEditor };
