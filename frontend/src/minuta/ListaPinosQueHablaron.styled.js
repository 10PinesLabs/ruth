import styled from 'styled-components';

export const TablaPinos = styled.table`
  width: 60%
  border-collapse: collapse
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)
`;

export const OrdenesTabla = styled.div`
  width: 100%;
  margin-bottom: 1%;
  display:flex;
  justify-content:center;
`;

export const FilaTitulosWrapper = styled.tr`
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)  
`;

export const Td = styled.td`
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center
`;
