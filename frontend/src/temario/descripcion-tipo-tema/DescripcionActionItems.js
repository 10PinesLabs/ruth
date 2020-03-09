import React from 'react';
import {Descripcion, DescripcionTemaContainer, ListaTemasARepasar} from './DescripcionTema.styled';
import {useSpring} from "react-spring";

const DescripcionActionItems = ({tema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});
    return (
      <DescripcionTemaContainer style={props}>
        <Descripcion>
          <ListaTemasARepasar>
            {tema.temasParaRepasar.map((temaReunionAnterior, index) => <li key={`tema-a-repasar-${index}`}>
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
};

export default DescripcionActionItems;
