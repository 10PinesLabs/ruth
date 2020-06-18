import React from 'react';
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

const actionItem = (descripcion, owners) =>{
  let [hoveringItem, setHoveringItem] = useState(false);
  const itemStyle = { backgroundColor: seEstaEditando ? colors.primary : colors.background,
    cursor: hoveringItem ? 'pointer' : 'auto',}
    
  return (
        <ListItem style={itemStyle} onMouseEnter={() => setHoveringItem(true)}>
            <ActionItemContainer>
            <ActionItemDesciption>{descripcion}</ActionItemDesciption>
            <div>
              { owners.map((owner) => <Owner>{"@" + owner}</Owner> ) }
            </div>
            </ActionItemContainer>
        </ListItem>
    )
}

const actionItemsConDivisores = (actionItems) => {
    const itemsConDivisores = []
    actionItems.forEach((item, index) => {
        itemsConDivisores.push(actionItem(item.actionItem.descripcion, item.actionItem.owners))
        if(actionItems[index+1]) itemsConDivisores.push(<Divider/>)
    })
    return itemsConDivisores
}

export const ListaActionItems = ({actionItems}) => {
  
    return (
        <ListaActionItemsContainer>
            <Titulo>Action Items ({actionItems.length})</Titulo>
            <List alignItems="flex-start" component={Card}>
                {actionItemsConDivisores(actionItems)}
            </List>
            
        </ListaActionItemsContainer>
       
    )
}