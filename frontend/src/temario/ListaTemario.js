import React from 'react';
import { ListaTemasContainer } from './ListaTemario.styled';
import TemaItem from './TemaItem';


const ListaTemario = ({ temas, seleccionarTema, temaActual }) => (
  <ListaTemasContainer>
    {temas.map((tema) =>
      <TemaItem
        key={tema.id}
        tema={tema}
        seleccionarTema={seleccionarTema}
        estaSeleccionado={temaActual.id === tema.id}
      />)}
  </ListaTemasContainer>
);

export default ListaTemario;
