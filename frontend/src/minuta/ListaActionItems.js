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

export const ListaActionItems = ({actionItems}) => {
  
    return (
        <ListaActionItemsContainer>
            <List alignItems="flex-start" component={Card}>
                {actionItems.map((item, index) =>
                  <>
                    <ActionItem 
                      descripcion={item.actionItem.descripcion} 
                      owners={item.actionItem.owners}
                    />
                    {actionItems[index + 1] ? <Divider/> : null}
                  </>
                )}
            </List>
        </ListaActionItemsContainer>
       
    )
}





