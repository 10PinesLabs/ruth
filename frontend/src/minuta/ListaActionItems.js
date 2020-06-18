import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {colors} from "../styles/theme";
import {ListaActionItemsContainer,
        ActionItemDesciption,
        ActionItemContainer,
        Titulo, 
        Owner} from '../minuta/ListaActionItems.styled'
import ActionItems from "../minuta/ActionItems";

const ActionItem = ({descripcion, owners, seEstaEditando}) =>{

    let [hoveringItem, setHoveringItem] = useState(false);
    const itemStyle = { padding: seEstaEditando ? 0 : 13,
                        cursor: hoveringItem ? 'pointer' : 'auto',}

    return (
        <ListItem style={itemStyle} onMouseEnter={() => setHoveringItem(true)}>
            {!seEstaEditando ? 
                <ActionItemContainer>
                <ActionItemDesciption>{descripcion}</ActionItemDesciption>
                <div>
                { owners.map((owner) => <Owner>{"@" + owner}</Owner> ) }
                </div>
                </ActionItemContainer>
            :
            <ActionItems/>
            }
        </ListItem>
    )
}

const actionItemsConDivisores = (actionItems) => {
    const itemsConDivisores = []
    actionItems.forEach((item, index) => {
        itemsConDivisores.push(<ActionItem descripcion={item.actionItem.descripcion} owners={item.actionItem.owners} seEstaEditando={false}/>)
        if(actionItems[index+1]) itemsConDivisores.push(<Divider/>)
    })
    return itemsConDivisores
}

export const ListaActionItems = ({actionItems}) => {
  
    return (
        <ListaActionItemsContainer>
            <List alignItems="flex-start" component={Card}>
                {actionItemsConDivisores(actionItems)}
            </List>
        </ListaActionItemsContainer>
       
    )
}