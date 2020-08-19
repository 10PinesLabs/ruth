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

    if(!this.props.reunion.abierta){
      toast.error('La reunion ya fue finalizada')
      return
    }

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
      temas={this.props.reunion.temas}
      actualizarTema={this.requestActualizarTema}
      cerrarReunion={this.cerrarReunion}
    />;
  }
}


const mapStateToProps = (state) => ({
  reunion: state.reunion,
});
export default connect(mapStateToProps)(TemasHandler);
