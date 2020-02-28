import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import backend from '../api/backend';
import VistaTemas from './VistaTemas';

class TemasHandler extends React.Component {
  dispatchTema = (data) => {
    const evento = {
      autor: 'PRESENTADOR',
      fecha: Date.now(),
      idTema: data.idTema,
      data: { tipo: data.tipo },
    };
    this.props.dispatch(evento);
  };

  dispatchReunion = (data) => {
    const evento = {
      autor: 'PRESENTADOR',
      fecha: Date.now(),
      data: { tipo: data.tipo },
    };
    this.props.dispatch(evento);
  };

  requestActualizarTema = (datosTema) => {
    this.dispatchTema({ tipo: datosTema.fin ? 'Terminar Tema' : 'Empezar Tema', idTema: datosTema.id });
  };

  cerrarReunion = () => {
    backend.cerrarReunion()
      .then(() => toast.success('Reunión finalizada'))
      .then(() => {
        this.setState({ redirect: true });
        this.dispatchReunion({ tipo: 'Cerrar Reunion' });
      })
      .catch(() => toast.error('No se pudo finalizar la reunión'));
  }

  render() {
    return <VistaTemas
      temas={this.props.temas}
      actualizarTema={this.requestActualizarTema}
      cerrarReunion={this.cerrarReunion}
    />;
  }
}


const mapStateToProps = (state) => ({
  temas: state.temas,
});
export default connect(mapStateToProps)(TemasHandler);
