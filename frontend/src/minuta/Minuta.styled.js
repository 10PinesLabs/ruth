import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { colors } from '../styles/theme';

export const TablaPinos = styled.table`
  width: 60%
  align-self: flex-start
  margin-left: 5%
  margin-top: 5%
  border-collapse: collapse
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)
`;

export const FilaTitulosWrapper = styled.tr`
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)  
`;

export const Td = styled.td`
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center
`;

export const BotonParaAbrirResumen = styled(Button)`
  && { 
    color: ${colors.primary};
    font-weight: bold;
    align-self: flex-start;
    margin-left: 10%;
  }
`;