import React, {useState, useEffect} from 'react';
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
import backend from '../api/backend'


const ActionItems = ({onAgregarActionItem, itemDescription, itemOwners, edicion, alDescartar, alEditar}) => {

  const [descripcion, setDescripcion] = useState(itemDescription || '' );
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
    backend.getRoots()
      .then((roots)=>{
        setListaDeRoots(roots)})
  }

  useEffect(actualizarListaDeRoots, [])

  return (
    <>
      <Box component={ContenedorEdicionActionItem} clone boxShadow={2}>
        <ContenedorEdicionActionItem maxWidth="md">
          <ContenedorInputActionItem maxWidth="md">
            <InputActionItem value={descripcion} onChange={(event) => setDescripcion(event.target.value)} multiline label="Descripcion"/>
            <Autocomplete
              multiple
              options={listaDeRoots}
              getOptionLabel={root => root.usuario}
              renderOption={root => <div>{root.usuario} ({root.nombre})</div>}
              value={owners}
              onChange={(event,value) => setOwners(value)}
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
              }}>{edicion ? "Guardar" : "Crear action item"}</BotonCrearActionItem>
          </ContenedorBotonesActionItem>
        </ContenedorEdicionActionItem>
      </Box>
    </>
  )
};

export default ActionItems;
