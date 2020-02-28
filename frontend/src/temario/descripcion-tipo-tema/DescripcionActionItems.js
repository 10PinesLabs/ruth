import React from 'react';
import {
  DescripcionTemaContainer, Titulo, Descripcion, ListaTemasARepasar,
} from './DescripcionTema.styled';

class DescripcionActionItems extends React.Component {
  render() {
    return (
      <DescripcionTemaContainer>
        <Titulo>{this.props.tema.titulo}</Titulo>
        <Descripcion>
          <ListaTemasARepasar>
            {this.props.tema.temasParaRepasar.map((temaReunionAnterior, index) => <li key={`tema-a-repasar-${index}`}>
              <b> {temaReunionAnterior.tema.titulo} </b>
              {temaReunionAnterior.actionItems.length !== 0
                ? <ul>
                  {temaReunionAnterior.actionItems.map((actionItem, index) => <li key={`action-item-${index}`}>
                    <p> {actionItem.descripcion}.
                      <b> Responsables </b>: {actionItem.responsables.map((responsable, index) => ((index < actionItem.responsables.length - 1) ? `${responsable.name}, ` : responsable.name))
                      } </p>
                  </li>)}
                </ul> : <p> No hay action items para este tema</p>}
            </li>)}
          </ListaTemasARepasar>
        </Descripcion>
      </DescripcionTemaContainer>
    );
  }
}

export default DescripcionActionItems;
