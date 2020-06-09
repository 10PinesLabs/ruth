import React from 'react';
import {FilaTitulosWrapper, OrdenesTabla, TablaPinos, Td} from './ListaPinosQueHablaron.styled';
import FilaPinoHablando from "./FilaPinoHablando";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import Button from "@material-ui/core/Button";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

export const cantidadReaccionesDelPino = (tipoReaccion,pino) => {
  return pino.reacciones[tipoReaccion].length;
}

const FilaTitulos = () => {
  return <FilaTitulosWrapper>
    <th>
      Nº
    </th>
    <th>
      Pino
    </th>
    <th>
      Tiempo
    </th>
    <th>
      De acuerdo
    </th>
    <th>
      Redondeando
    </th>
    <th>
      No de acuerdo
    </th>
    <th>
      Resumen
    </th>
  </FilaTitulosWrapper>;
};

function getMinutes(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMinutes()}:${date.getSeconds()}`;
}

const FilaPino = (props) => <tr>
  <td>
    {props.orden}
  </td>
  <Td>
    {props.pino.usuario.nombre}
  </Td>
  <Td>
    {props.tiempo}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP,props.pino)}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.REDONDEAR,props.pino)}
  </Td>
  <Td>
    {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN,props.pino)}
  </Td>
  <td>
    <p>Un resumen</p>
    <button>EDITAR</button>
  </td>
</tr>;

class ListaPinosQueHablaron extends React.Component {

  oradoresEnOrdenDecendiente = () => {
    return [...this.props.oradores.pasados
      .map((pino, index) =>
        <FilaPino
          pino={pino}
          orden={index + 1}
          tiempo={getMinutes(pino.fin - pino.inicio)}
        />),
      this.props.oradores.actual
        ? <FilaPinoHablando
          pino={this.props.oradores.actual}
          orden={this.props.oradores.pasados.length + 1}
        /> : null];
  }
  
  oradoresEnOrdenAscendente = () => {
    return this.oradoresEnOrdenDecendiente().reverse();
  }
  
  state = {oradoresOrdenados: this.oradoresEnOrdenAscendente}

  render() {
    return (<>
      <OrdenesTabla>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ExpandLess/>}
          onClick={() => this.setState({oradoresOrdenados: this.oradoresEnOrdenAscendente})}
        >
          Mas recientes
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ExpandMore/>}
          onClick={() => this.setState({oradoresOrdenados: this.oradoresEnOrdenDecendiente})}
        >
          Orden cronolgico
        </Button>
      </OrdenesTabla>
      <TablaPinos>
        <FilaTitulos/>
        <tbody>
        
        {this.state.oradoresOrdenados()}

        </tbody>
      </TablaPinos>
      </>
    );
  }
  
}

export default ListaPinosQueHablaron;
