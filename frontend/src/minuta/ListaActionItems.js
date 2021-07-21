import React, {useState} from 'react';
import {List, ListItem, Divider, makeStyles} from '@material-ui/core';
import {ActionItemContainer, ActionItemDescription, ListaActionItemsContainer, Owner} from './ListaActionItems.styled'
import {ActionItemEditor} from "./ActionItemEditor";

const ActionItem = ({descripcion, owners, onEdit, onDelete, id, reunionAbierta}) =>{
  const [estaEditando, setEstaEditando] = useState(false);

  const actionItemConId = (actionItem) => { return {...actionItem, id}}

  const alGuardarEdicion = (actionItemGuardado) => {
    onEdit(actionItemConId(actionItemGuardado))
    setEstaEditando(false)
  }

  const alBorrarActionItem = (actionItemABorrar) => {
    onDelete(actionItemConId(actionItemABorrar))
  }

  const itemClass = {
    padding: estaEditando ? 0 : 13,
  };
  
  return (
    <ListItem
      style={itemClass}
      button={!estaEditando}
      onClick={()=> !estaEditando ? setEstaEditando(true) : null}
      disabled={!reunionAbierta}
    >
      {!estaEditando ?
        <ActionItemContainer>
          <ActionItemDescription>{descripcion}</ActionItemDescription>
          <div>
            { owners.map((owner) => <Owner>{"@" + owner.usuario}</Owner> ) }
          </div>
        </ActionItemContainer>
      :
        <ActionItemEditor
          itemDescription={descripcion}
          itemOwners={owners}
          estaEditando={estaEditando}
          alDescartar={()=>{setEstaEditando(false)}}
          alBorrar={alBorrarActionItem}
          onSubmit={alGuardarEdicion}
        />
      }
    </ListItem>
  )
}

export const ListaActionItems = ({actionItems, onEdit, alBorrar, reunionAbierta}) => {
  
  function esElUltimoItem(index) {
    return actionItems.length === index + 1;
  }

  const classes = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }))();


  return (
    <ListaActionItemsContainer>
      {
        actionItems.length !== 0 &&
        <List alignItems="flex-start" className={classes.root}>
            {actionItems.slice().reverse().map((item, index) =>
              <>
                <ActionItem
                  key={item.id} 
                  id={item.id}
                  descripcion={item.actionItem.descripcion} 
                  owners={item.actionItem.owners}
                  onEdit={onEdit}
                  onDelete={alBorrar}
                  reunionAbierta={reunionAbierta}
                />
                {!esElUltimoItem(index) && <Divider/>}
              </>
            )}
        </List>
      }
    </ListaActionItemsContainer>
  )
}





