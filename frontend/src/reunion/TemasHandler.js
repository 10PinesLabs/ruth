import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import backend from '../api/backend';
import VistaTemas from './VistaTemas';
import { temaEventos } from '../store/tema'
import { reunionEventos } from '../store/reunion';
import {withRouter} from "react-router-dom";

class TemasHandler extends React.Component {

  cerrarReunion = (temas) => {
    backend.cerrarReunion(this.props.reunionId,temas)
      .then(() => {
        this.props.dispatch(reunionEventos.finalizarReunionActual());
        this.props.history.push("/");
      })
      .then(() => toast.success('Reunión finalizada'))
      .catch(() => {toast.error('No se pudo finalizar la reunión')});
  }

  render() {
    return <VistaTemas
      usuario={this.props.usuario}
      temas={this.props.temas}
      dispatch={this.props.dispatch}
      reunionId={this.props.reunionId}
      cerrarReunion={this.cerrarReunion}
    />;
  }
}


const mapStateToProps = (state) => ({
  temas: state.reunion.temas,
  reunionId: state.reunion.id,
});
export default connect(mapStateToProps)(withRouter(TemasHandler));
