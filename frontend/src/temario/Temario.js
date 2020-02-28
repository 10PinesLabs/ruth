import React from 'react';
import {
  Arrow, TemarioContainer, Temas, Titulo, LeyendaEmpresa, ExtensionLeyendaEmpresa, ContenidoTemario,
} from './Temario.styled';
import ListaTemario from './ListaTemario';
import {SecondaryButton} from "../components/Button.styled";

class Temario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  render() {
    return (
      <TemarioContainer isActive={this.state.isActive}
                        onMouseEnter={() => this.setState({ isActive: true })}
                        onMouseLeave={() => this.setState({ isActive: false })}>
      <Temas>
        <LeyendaEmpresa>10 Pines</LeyendaEmpresa>
        <ExtensionLeyendaEmpresa>Creative Software Development</ExtensionLeyendaEmpresa>
        <ContenidoTemario>
          <Titulo> Temario </Titulo>
          <ListaTemario temas = {this.props.temas}
                        seleccionarTema = {this.props.seleccionarTema}/>
        </ContenidoTemario>
        <SecondaryButton style={{ marginBottom: '2rem', marginTop: 'auto', padding: '0.5em 0',  width: '100%' }}
                         onClick={this.props.cerrarReunion}
                         disabled={false}>Cerrar Reunión</SecondaryButton>
        <Arrow src="./pino-blanco.svg"
               onMouseEnter={() => this.setState({ isActive: true })} />
      </Temas>
      </TemarioContainer>
    );
  }
}

export default Temario;
