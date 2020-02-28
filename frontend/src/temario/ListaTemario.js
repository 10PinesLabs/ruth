import React from 'react';
import { ListaTemasContainer } from './ListaTemario.styled';
import TemaItem from './TemaItem';


const ListaTemario = ({ temas, seleccionarTema }) => (
  <ListaTemasContainer>
    {temas.map((tema) => <TemaItem key={tema.id} tema={tema}
      seleccionarTema={seleccionarTema}/>)}
  </ListaTemasContainer>
);

export default ListaTemario;
