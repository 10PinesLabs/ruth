import React from 'react';
import ReactGoogleSlides from 'react-google-slides';
import {PresentacionContainter, SidebarIzquierdo, SlidesContainer} from './Presentacion.styled';

class Presentacion extends React.Component {
  static canHandleView = (view) => view === 'Presentación'

  render() {
    return (
      <PresentacionContainter>
        <SidebarIzquierdo/>
        <SlidesContainer>
          <ReactGoogleSlides height="100%" width="100%" slidesLink={this.props.tema.linkDePresentacion} slideDuration={20} showControls/>
        </SlidesContainer>
      </PresentacionContainter>
    );
  }
}

export default Presentacion;
