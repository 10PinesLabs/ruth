import React from 'react';
import Clock from "../clock/Clock";
import {TiposReaccionAlHablar} from "../cola-de-participantes/TalkingReactions";
import {cantidadReaccionesDelPino} from "./ListaPinosQueHablaron";
import {OradorActualContainer, StyledTableCell} from "./TablaOradores.styled";
import {RecordVoiceOver} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {TableRow} from "@material-ui/core";

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
    return (<TableRow>
        <StyledTableCell align={"center"}>
          {this.props.orden}
        </StyledTableCell>
        <StyledTableCell>
          <OradorActualContainer>
            <RecordVoiceOver style={{ color: green[500], marginRight: "10px"}}/>
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
}

export default FilaPinoHablando;
