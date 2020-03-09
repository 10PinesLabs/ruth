import React from 'react';
import ReactGoogleSlides from 'react-google-slides';
import {PresentacionContainter, SlidesContainer} from './Presentacion.styled';

class Presentacion extends React.Component {
  static canHandleView = (view) => view === 'Presentación'

  render() {
    return (
      <PresentacionContainter>
        <SlidesContainer>
          <ReactGoogleSlides width="90%" height="90%" slidesLink={this.props.tema.linkDePresentacion} slideDuration={20} showControls/>
        </SlidesContainer>
      </PresentacionContainter>
    );
  }
}

export default Presentacion;
