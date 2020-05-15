import React from 'react';
import { ChartWrapperContainer, IconListContainer } from "../debate-handler/Debate.styled";

export const ChartWrapper = ({ emojis, children }) => (
  <>
    { children }
    <IconListContainer>
      <IconoPrueba/>
    </IconListContainer>
  </>
);

export const IconoPrueba = () => <div style={{width: '10px', height: '10px', backgroundColor: 'black'}}/>;
