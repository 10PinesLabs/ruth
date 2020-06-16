import React from 'react';
import styled from 'styled-components';
import {colors} from '../styles/theme'


export const ListaActionItemsContainer = styled.div`
width:80%
color:black`

export const Titulo = styled.h2`
display:inline;
margin: 20px;
vertical-align: middle;
    `

export const ActionItemContainer = styled.div`
display:flex;
flex-direction: column;`

export const Owner = styled.span`
margin: 3px;
color:${colors.primary}
font-weight: bold;`

export const ActionItemDesciption = styled.div`
display: block;
width: 100%;
`