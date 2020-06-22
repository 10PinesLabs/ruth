import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {ListaActionItemsContainer,
        ActionItemDesciption,
        ActionItemContainer,
        Owner} from './ListaActionItems.styled'

const ActionItem = ({ descripcion, owners }) => (
    <ListItem>
        <ActionItemContainer>
            <ActionItemDesciption>{descripcion}</ActionItemDesciption>
            <div>
              { owners.map((owner) => <Owner>{"@" + owner}</Owner> ) }
            </div>
        </ActionItemContainer>
    </ListItem>
)

const actionItemsConDivisores = (actionItems) => {
    const itemsConDivisores = []
    actionItems.forEach((item, index) => {
        itemsConDivisores.push(<ActionItem descripcion={item.actionItem.descripcion} owners={item.actionItem.owners}/>)
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
