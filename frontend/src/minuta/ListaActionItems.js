import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {ActionItemContainer, ActionItemDescription, ListaActionItemsContainer, Owner} from './ListaActionItems.styled'
import {ActionItemEditor} from "./ActionItemEditor";

const ActionItem = ({descripcion, owners, onEdit, id}) =>{
  const [estaEditando, setEstaEditando] = useState(false);

  const alGuardarEdicion = (actionItemGuardado) => {
    onEdit({...actionItemGuardado, id})
    setEstaEditando(false)
  }

  const itemClass = {
    padding: estaEditando ? 0 : 13,
  };
  
  return (
    <ListItem 
      style={itemClass} 
      button={!estaEditando}
      onClick={()=> !estaEditando? setEstaEditando(true) : null}
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
          onSubmit={alGuardarEdicion}
        />
      }
    </ListItem>
  )
}

export const ListaActionItems = ({actionItems, onEdit}) => {
  
  function esElUltimoItem(index) {
    return actionItems.length === index + 1;
  }
  
  return (
    <ListaActionItemsContainer>
        <List alignItems="flex-start" component={Card}>
            {actionItems.slice().reverse().map((item, index) =>
              <>
                <ActionItem 
                  key={item.id} 
                  id={item.id}
                  descripcion={item.actionItem.descripcion} 
                  owners={item.actionItem.owners}
                  onEdit={onEdit}
                />
                {!esElUltimoItem(index) && <Divider/>}
              </>
            )}
        </List>
    </ListaActionItemsContainer>
  )
}





