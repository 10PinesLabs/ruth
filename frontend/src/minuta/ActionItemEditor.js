import React, {useState, useEffect} from 'react';
import {
  BotonBorrar,
  BotonCancelar,
  BotonEnviar,
  ContenedorEdicionActionItem,
  ContenedorInputActionItem,
  InputActionItem,
} from './ActionItemEditor.styled';
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from "@material-ui/core";
import backend from '../api/backend'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ActionItemEditor = ({onSubmit, itemDescription, itemOwners, estaEditando = false, alDescartar, alBorrar}) => {

  const [descripcion, setDescripcion] = useState(itemDescription || '');
  const [owners, setOwners] = useState(itemOwners || []);
  const [usuarios, setUsuarios] = useState([])
  const [confirmacionDeBorradoAbierta, setConfirmacionDeBorradoAbierta] = useState(false)

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
    if(esUnActionItemValido(actionItem)){
      onSubmit(actionItem);
      limpiarInputs();
    }
  }

  const esUnActionItemValido = (actionItem) => {
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

  const abrirConfirmacionDeBorrado = () => {
    setConfirmacionDeBorradoAbierta(true)
  }

  const cerrarConfirmacionDeBorrado = () => {
    setConfirmacionDeBorradoAbierta(false)
  }

  const borrar = () => {
    cerrarConfirmacionDeBorrado()
    alBorrar({owners, descripcion})
  }

  useEffect(actualizarUsuarios, [])

  return (
    <>
      <Box component={ContenedorEdicionActionItem} clone boxShadow={2}>
        <ContenedorEdicionActionItem maxWidth="md">
          <ContenedorInputActionItem maxWidth="md">
            <InputActionItem value={descripcion} onChange={(event) => setDescripcion(event.target.value)} multiline label="Descripción"/>
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
          <Botonera estaEditando={estaEditando} onClick={abrirConfirmacionDeBorrado} onClick1={descartar}
                    onClick2={guardar}/>
        </ContenedorEdicionActionItem>
      </Box>
      <Dialog
        open={confirmacionDeBorradoAbierta}
        onClose={cerrarConfirmacionDeBorrado}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">¿Querés borrar este Action Item?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Mirá que lo borramos ehh, lo borramos…
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarConfirmacionDeBorrado}>
            Cancelar
          </Button>
          <Button onClick={borrar} color="secondary">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

function Botonera(props) {
  
   const BotonesBorrarYCancelar = (props) => (
    <>
       <BotonCancelar onClick={props.onClick1} variant="outlined">Descartar</BotonCancelar>
       <BotonEnviar
         size="small"
         onClick={props.onClick2}>
         {props.estaEditando ? "Guardar" : "Crear action item"}
       </BotonEnviar>
    </>
  );
  
  return <Box display="flex" justifyContent="space-between">
    {(props.estaEditando)?
      <>
        <BotonBorrar 
          variant="outlined" 
          onClick={props.onClick}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </BotonBorrar>
        <Box 
          display="flex" 
          justifyContent= "space-between"
          width="0.4"
        >
          <BotonesBorrarYCancelar {...props}/>
        </Box>
      </>
      :
      <BotonesBorrarYCancelar {...props}/>
    }
  </Box>;
}

export { ActionItemEditor };
