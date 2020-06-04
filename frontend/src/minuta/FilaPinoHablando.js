import React from 'react';
import { Td } from './ListaPinosQueHablaron.styled';
import Clock from "../clock/Clock";
import {tipoDeEvento} from "../store/oradores";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";

class FilaPinoHablando extends React.Component {

  constructor(props) {
    super(props);
    this.state = { secondsElapsed: Math.ceil(((Date.now()) - this.props.pino.inicio) / 1000) };
  }

  componentDidMount() {
    this.runWatch();
  }

  componentWillUnmount() {
    this.stopWatch();
  }

  stopWatch = () => {
    clearInterval(this.incrementer);
    this.incrementer = null;
  }

  runWatch = () => {
    this.incrementer = setInterval(() => {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    }, 1000);
  }

  // TODO refactorizar para evitar replicado de logica con filapino
  reaccionesDelPino(filtro) {
    return this.props.pino.reacciones.filter((reaccion) =>
      reaccion.reaccion === filtro &&
      reaccion.tipo === tipoDeEvento.REACCIONAR_A_ORADOR).length;
  }

  render() {
    return (<tr>
        <td>
          {this.props.orden}
        </td>
        <Td>
          {this.props.pino.usuario.nombre}
        </Td>
        <Td>

          {<Clock seconds={this.state.secondsElapsed}/>}
        </Td>
        <Td>
          {this.reaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP)}
        </Td>
        <Td>
          {this.reaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN)}
        </Td>
        <Td>
          {this.reaccionesDelPino(TiposReaccionAlHablar.REDONDEAR)}
        </Td>
        <td>
          <p>Estoy hablando</p>
          <button>EDITAR</button>
        </td>
      </tr>
    );
  }
}

export default FilaPinoHablando;
