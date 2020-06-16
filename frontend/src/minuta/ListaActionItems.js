import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import {ListaActionItemsContainer, Titulo} from '../minuta/ListaActionItems.styled'

const ActionItem = () =>{
    return (
        <>
        <ListItem>Item lol</ListItem>
        <hr/>
        </>
    )
}


export const ListaActionItems = () => {

    return (
        <ListaActionItemsContainer>
            <Titulo>Action Items</Titulo>
            <Button variant="outlined"> + Agregar Action Item</Button>
            <List alignItems="flex-start">
                <ActionItem/>
                <ActionItem/>
                <ActionItem/>
                <ActionItem/>
            </List>
            
        </ListaActionItemsContainer>
       
    )
}