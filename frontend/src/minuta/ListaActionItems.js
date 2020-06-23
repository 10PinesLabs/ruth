import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {ActionItemContainer, ActionItemDesciption, ListaActionItemsContainer, Owner} from './ListaActionItems.styled'
import {ActionItemEditor} from "./ActionItemEditor";

const ActionItem = ({descripcion, owners, onEdit, index}) =>{
  let [estaEditando, setEstaEditando] = useState(false);

  const alGuardarEdicion = (actionItemGuardado) => {
    onEdit({...actionItemGuardado, index})
    setEstaEditando(false)
  }

  const itemClass = {
    padding: estaEditando ? 0 : 13,
  };
  
  return (
    <ListItem 
      style={itemClass} 
      button
      onClick={()=> !estaEditando? setEstaEditando(true) : null}
    >
      {!estaEditando ? 
        <ActionItemContainer>
          <ActionItemDesciption>{descripcion}</ActionItemDesciption>
          <div>
            { owners.map((owner) => <Owner>{"@" + owner}</Owner> ) }
          </div>
        </ActionItemContainer>
      :
        <ActionItemEditor 
          itemDescription={descripcion}
          itemOwners={owners}
          estaEditando={estaEditando}
          alDescartar={()=>{setEstaEditando(false)}}
          onEdit={alGuardarEdicion}
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
            {actionItems.map((item, index) =>
              <>
                <ActionItem 
                  key={item.id} 
                  index={index}
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





