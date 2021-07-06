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
      console.log(this.props.estadoReunion);

      backend.cerrarReunion(this.props.reunionId, temas)
        .then(() => {
          this.props.dispatch(reunionEventos.finalizarReunionActual());
          this.props.history.push('/');
        })
        .then(() => {
          if (this.props.estadoReunion) {
            toast.success('Reunión finalizada');
          } else {
            toast.success('Reunión cerrada');
          }
        })
        .catch(() => {
          toast.error('No se pudo finalizar la reunión');
        });
    }


    render() {
      return <VistaTemas
            usuario={this.props.usuario}
            temas={this.props.temas}
            dispatch={this.props.dispatch}
            cerrarReunion={this.cerrarReunion}
            estadoReunion={this.props.estadoReunion}
        />;
    }
}


const mapStateToProps = (state) => ({
  temas: state.reunion.temas,
  reunionId: state.reunion.id,
  estadoReunion: state.reunion.abierta,
});
export default connect(mapStateToProps)(withRouter(TemasHandler));
