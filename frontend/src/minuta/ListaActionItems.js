import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {ListaActionItemsContainer} from '../minuta/ListaActionItems.styled'

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
        <span>Action items!</span>
        <List alignItems="flex-start">
            <ActionItem/>
            <ActionItem/>
            <ActionItem/>
            <ActionItem/>
        </List>

        <ListaActionItemsContainer/>
    )
}