import React from 'react';
import ReactGoogleSlides from 'react-google-slides';
import {SlidesContainer} from './Presentacion.styled';

class Presentacion extends React.Component {
  static canHandleView = (view) => view === 'Presentación'

  render() {
    return (
      <SlidesContainer>
        <ReactGoogleSlides width="90%" height="90%" slidesLink={this.props.tema.linkDePresentacion} slideDuration={20}
                           showControls/>
      </SlidesContainer>
    );
  }
}

export default Presentacion;
