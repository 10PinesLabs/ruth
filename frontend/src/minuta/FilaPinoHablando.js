import React from 'react';
import { Td } from './Minuta.styled';
import Clock from "../clock/Clock";

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
          7
        </Td>
        <Td>
          12
        </Td>
        <Td>
          3
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
