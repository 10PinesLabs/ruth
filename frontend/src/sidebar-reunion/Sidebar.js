import React from 'react';
import { faChartBar, faBroadcastTower, faComment, faUsers, faEdit } from '@fortawesome/free-solid-svg-icons';


import SidebarElement from './SidebarElement';
import { SidebarContainer, ElementoContainer } from './Sidebar.styled';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElement: 'Resumen',
    };
  }

  menu =[
    { icon: faBroadcastTower, title: 'Resumen', habilitado: true,oculto: false },
    { icon: faComment, title: 'Presentación', habilitado: false,oculto: false },
    { icon: faChartBar, title: 'Debate', habilitado: true,oculto: false },
    { icon: faUsers, title: 'Opinar', habilitado: true,oculto: false },
    { icon: faEdit, title: 'Minuta', habilitado: true,oculto: process.env.REACT_APP_MINUTA_PERMITIDA !== 'true' }
  ] ;

  habilitarPresentacion = () => this.props.link !== null

  render() {
    return (
      <SidebarContainer>
        {this.menu.filter( opcion => !opcion.oculto).map((seccion) => <ElementoContainer
          key={seccion.title}
          habilitar={seccion.habilitado || this.habilitarPresentacion()}
          onClick={() => this.props.handleSelection(seccion.title)}>
          <SidebarElement
            icon={seccion.icon}
            title={seccion.title}
            isActive={this.props.selectedElement === seccion.title}/>
        </ElementoContainer>)}
      </SidebarContainer>
    );
  }
}

export default Sidebar;
