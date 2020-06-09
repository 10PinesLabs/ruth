import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { colors } from '../styles/theme';

export const TablaPinos = styled.table`
  width: 90%
  align-self: flex-start
  margin-left: 5%
  margin-bottom: 10px
  border-collapse: collapse
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)
`;

export const ConclusionTitle = styled.h1 `
  align-self: flex-start;
  margin-block-end: 0
`

export const ConclusionTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
`
export const ConclusionForm = styled.form `
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`

export const BotonParaAbrirResumen = styled(Button)`
  && { 
    color: ${colors.primary};
    font-weight: bold;
    align-self: flex-start;
    margin-left: 10%;
  }
`;
