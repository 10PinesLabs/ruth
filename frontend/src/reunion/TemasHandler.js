import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import backend from '../api/backend';
import VistaTemas from './VistaTemas';
import { temaEventos } from '../store/tema';
import { reunionEventos } from '../store/reunion';

class TemasHandler extends React.Component {
  cerrarReunion = (temas) => {
    if (!this.props.estadoReunion) {
      toast.error('La reunion ya está cerrada');
    } else {
       backend.cerrarReunion(this.props.reunionId, temas)
         .then(() => {
           this.props.dispatch(reunionEventos.finalizarReunionActual());
           this.props.history.push('/');
           toast.success('Reunión finalizada');
         })
         .catch(() => {
           toast.error('No se pudo finalizar la reunión');
          });
      }
  }

  volverALobby = () => {
    this.props.history.push('/');
  }

  render() {
    return <VistaTemas
      usuario={this.props.usuario}
      temas={this.props.temas}
      dispatch={this.props.dispatch}
      cerrarReunion={this.cerrarReunion}
      estadoReunion={this.props.estadoReunion}
      volverALobby={this.volverALobby}
      />;
  }
}


const mapStateToProps = (state) => ({
  temas: state.reunion.temas,
  reunionId: state.reunion.id,
  estadoReunion: state.reunion.abierta,
});
export default connect(mapStateToProps)(withRouter(TemasHandler));
