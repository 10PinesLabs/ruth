import React from 'react';
import { connect } from 'react-redux';
import OradoresVista from './OradoresVista';
import { colors } from '../styles/theme';
import ChartBar from '../chart/chartBar';

class Oradores extends React.Component {
  render() {
    return (
      <>
        <h1>Oradores</h1>
        <OradoresVista oradores={this.props.oradores}/>
        <h1>Reacciones</h1>
        <ChartBar data={this.props.dataBar}/>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  const temaActual = state.temas.find((tema) => tema.fin === null && tema.inicio !== null);

  return ({
    oradores: temaActual.oradores,
    dataBar: {
      data: temaActual.reacciones,
      color: colors.primary,
    },
  });
};

export default connect(mapStateToProps)(Oradores);
