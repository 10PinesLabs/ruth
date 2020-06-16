import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';


import {ListaActionItemsContainer,ActionItemDesciption, ActionItemContainer,Titulo, Owner} from '../minuta/ListaActionItems.styled'


const actionItems = [
    {descripcion:"Como minuteador, quiero poder enviar la minuta por email al finalizar la reunion de roots", owners:["olatito", "lauturro"]},
    {descripcion: "Como owner de un action item, me gustaria recibir un email con la descripcion del mismo", owners:["olatito", "lauturro"]},
    {descripcion:"[BUG] No se puede iniciar sesion en produccion", owners:["olatito", "lauturro"]},    
]

const actionItem = (descripcion, owners) =>{
    return (
        <>
        <ListItem>
            <ActionItemContainer>
            <ActionItemDesciption>{descripcion}</ActionItemDesciption>
            <div>
                <Owner>{"@" + owners[0]}</Owner>
                <Owner>{"@" + owners[0]}</Owner>
                <Owner>{"@" + owners[0]}</Owner>
            </div>
            </ActionItemContainer>
        </ListItem>
        </>
    )
}

const actionItemsConDivisores = (actionItems) => {
    const itemsConDivisores = []
    actionItems.forEach((item, index) => {
        itemsConDivisores.push(actionItem(item.descripcion, item.owners))
        if(actionItems[index+1]) itemsConDivisores.push(<Divider/>)
    })
    return itemsConDivisores
}

export const ListaActionItems = () => {
  
    const itemsConDivisores = []
    return (
        <ListaActionItemsContainer>
            <Titulo>Action Items ({actionItems.length})</Titulo>
            <List alignItems="flex-start" component={Card}>
                {actionItemsConDivisores(actionItems)}
            </List>
            
        </ListaActionItemsContainer>
       
    )
}