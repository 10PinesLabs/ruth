import React from 'react';
import styled from 'styled-components';
import {colors} from '../styles/theme'


export const ListaActionItemsContainer = styled.div`
color:black`

export const ActionItemContainer = styled.div`
display:flex;
flex-direction: column;`

export const Owner = styled.span`
margin: 3px;
color:${colors.primary}
font-weight: bold;`

export const ActionItemDescription = styled.div`
display: block;
width: 100%;
`