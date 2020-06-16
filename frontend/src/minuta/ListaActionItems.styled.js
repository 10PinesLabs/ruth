import React from 'react';
import styled from 'styled-components';
import {colors} from '../styles/theme'


export const ListaActionItemsContainer = styled.div`
width:80%
color:black`

export const Titulo = styled.h2`
display:block;
margin: 10px;
vertical-align: middle;
margin-bottom:10px  `

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