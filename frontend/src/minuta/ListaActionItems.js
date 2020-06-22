import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {ListaActionItemsContainer,
        ActionItemDesciption,
        ActionItemContainer,
        Owner} from './ListaActionItems.styled'
import {ActionItemEditor} from "./ActionItemEditor";

const ActionItem = ({descripcion, owners, seEstaEditando, alEditar, index}) =>{
  let [hoveringItem, setHoveringItem] = useState(false);
  let [editando, setEditando] = useState(seEstaEditando);

  const itemStyle = { padding: editando ? 0 : 13,
                      cursor: hoveringItem ? 'pointer' : 'auto',}

  const alGuardarEdicion = (actionItemGuardado) => {
      alEditar({...actionItemGuardado, index})
      setEditando(false)
  }

  return (
    <ListItem 
      style={itemStyle} 
      onMouseEnter={() => setHoveringItem(true)} 
      onClick={()=> !editando? setEditando(true) : null}
    >
      {!editando ? 
        <ActionItemContainer>
          <ActionItemDesciption>{descripcion}</ActionItemDesciption>
          <div>
            { owners.map((owner) => <Owner>{"@" + owner}</Owner> ) }
          </div>
        </ActionItemContainer>
    :
        <ActionItemEditor 
          itemDescription={descripcion}
          itemOwners={owners} edicion={editando}
          alDescartar={()=>{setEditando(false)}}
          alEditar={alGuardarEdicion}
        />
      }
    </ListItem>
  )
}

export const ListaActionItems = ({actionItems, alEditar}) => {
  
  function siguienteElemento(index) {
    return actionItems[index + 1];
  }
  
    return (
        <ListaActionItemsContainer>
            <List alignItems="flex-start" component={Card}>
                {actionItems.map((item, index) =>
                  <>
                    <ActionItem 
                      key={index} 
                      index={index}
                      descripcion={item.actionItem.descripcion} 
                      owners={item.actionItem.owners}
                      alEditar={alEditar}
                    />
                    {siguienteElemento(index) ? <Divider/> : null}
                  </>
                )}
            </List>
        </ListaActionItemsContainer>
    )
}





