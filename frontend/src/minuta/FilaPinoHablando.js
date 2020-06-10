import React from 'react';
import Clock from "../clock/Clock";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {cantidadReaccionesDelPino} from "./ListaPinosQueHablaron";
import {OradorActualContainer, StyledTableCell} from "./TablaOradores.styled";
import {RecordVoiceOver} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {TableRow} from "@material-ui/core";
import {colors} from "../styles/theme";

class FilaPinoHablando extends React.Component {
  
  state = {
    secondsElapsed: Math.ceil(((Date.now()) - this.props.pino.inicio) / 1000),
    pointerCursor: false
  };
  
  nroDeOrdenSeleccionadoEnTabla = this.props.seleccion[0];
  setNroDeOrdenSeleccionadoEnTabla = this.props.seleccion[1];

  rowStyle = {
      ...(this.nroDeOrdenSeleccionadoEnTabla === this.props.orden) ?
        {backgroundColor: colors.primary} :
        {backgroundColor: colors.background},
      ...(this.state.pointerCursor) ?
        {cursor: "pointer"}:
        {cursor: "auto"}
    };

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
    return (<TableRow
        style={this.rowStyle}
        onMouseEnter={() => this.setState({pointerCursor: true})}
        onMouseLeave={() => this.setState({pointerCursor: false})}
        onClick={this.onOrdenSeleccionado}
      >
        <StyledTableCell align={"center"}>
          {this.props.orden}
        </StyledTableCell>
        <StyledTableCell>
          <OradorActualContainer>
            <RecordVoiceOver style={{ color: colors.viridian, marginRight: "10px"}}/>
            <strong>
              {this.props.pino.usuario.nombre}
            </strong>
          </OradorActualContainer>
        </StyledTableCell>
        <StyledTableCell align={"center"}>
          {<Clock seconds={this.state.secondsElapsed}/>}
        </StyledTableCell>
        <StyledTableCell align={"center"}>
          {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_UP,this.props.pino)}
        </StyledTableCell>
        <StyledTableCell align={"center"}>
          {cantidadReaccionesDelPino(TiposReaccionAlHablar.REDONDEAR,this.props.pino)}
        </StyledTableCell>
        <StyledTableCell align={"center"}>
          {cantidadReaccionesDelPino(TiposReaccionAlHablar.THUMBS_DOWN,this.props.pino)}
        </StyledTableCell>
        <StyledTableCell align={"center"}>
        </StyledTableCell>
      </TableRow>
    );
  }
  onOrdenSeleccionado = () => {
    if(this.nroDeOrdenSeleccionadoEnTabla === this.props.orden) {
      this.setNroDeOrdenSeleccionadoEnTabla(0);
    } else {
      this.setNroDeOrdenSeleccionadoEnTabla(this.props.orden);
    }
    this.props.onClick();
  }
}

export default FilaPinoHablando;
