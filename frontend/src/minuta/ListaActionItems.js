import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {ListaActionItemsContainer,
        ActionItemDesciption,
        ActionItemContainer,
        Titulo, 
        Owner} from '../minuta/ListaActionItems.styled'
import ActionItems from "../minuta/ActionItems";

const ActionItem = ({descripcion, owners, seEstaEditando, alEditar, index}) =>{
    let [hoveringItem, setHoveringItem] = useState(false);
    let [editando, setEditando] = useState(seEstaEditando);

    const itemStyle = { padding: editando ? 0 : 13,
                        cursor: hoveringItem ? 'pointer' : 'auto',}

    const alGuardarEdicion = (actionItemGuardado) => {
        actionItemGuardado.index = index;
        alEditar(actionItemGuardado)
        setEditando(false)
    }

    return (
        <ListItem style={itemStyle} 
                    onMouseEnter={() => setHoveringItem(true)} 
                    onClick={()=>{if(!editando)setEditando(true)}}>

            {!editando ? 
                <ActionItemContainer>
                <ActionItemDesciption>{descripcion}</ActionItemDesciption>
                <div>
                { owners.map((owner) => <Owner>{"@" + owner.usuario}</Owner> ) }
                </div>
                </ActionItemContainer>
            :
                <ActionItems 
                itemDescription={descripcion}
                itemOwners={owners} edicion={editando}
                alDescartar={()=>{setEditando(false)}}
                alEditar={alGuardarEdicion}
                />
            }
        </ListItem>
    )
}

const actionItemsConDivisores = (actionItems, alEditar) => {
    const itemsConDivisores = []
    actionItems.forEach((item, index) => {
        itemsConDivisores.push(<ActionItem key={index} index={index} descripcion={item.actionItem.descripcion} owners={item.actionItem.owners} alEditar={alEditar}/>)
        if(actionItems[index+1]) itemsConDivisores.push(<Divider/>)
    })
    return itemsConDivisores
}

export const ListaActionItems = ({actionItems, alEditar}) => {
  
    return (
        <ListaActionItemsContainer>
            <List alignItems="flex-start" component={Card}>
                {actionItemsConDivisores(actionItems, alEditar)}
            </List>
        </ListaActionItemsContainer>
       
    )
}