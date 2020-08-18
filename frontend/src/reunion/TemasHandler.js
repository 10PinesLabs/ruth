import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import backend from '../api/backend';
import VistaTemas from './VistaTemas';
import { temaEventos } from '../store/tema'
import { reunionEventos } from '../store/reunion';

class TemasHandler extends React.Component {

  requestActualizarTema = (datosTema) => {
    this.props.dispatch( datosTema.fin ? temaEventos.terminarTema(datosTema.id)  : temaEventos.empezarTema(datosTema.id));
  };

  cerrarReunion = (temas) => {
    backend.cerrarReunion(temas)
      .then(() => {
        this.props.dispatch(reunionEventos.finalizarReunionActual());
      })
      .then(() => toast.success('Reunión finalizada'))
      .catch(() => {toast.error('No se pudo finalizar la reunión')});
  }

  render() {
    return <VistaTemas
      usuario={this.props.usuario}
      temas={this.props.temas}
      actualizarTema={this.requestActualizarTema}
      cerrarReunion={this.cerrarReunion}
    />;
  }
}


const mapStateToProps = (state) => ({
  temas: state.reunion.temas,
});
export default connect(mapStateToProps)(TemasHandler);
