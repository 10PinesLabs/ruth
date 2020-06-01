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

  menu = [
    { icon: faBroadcastTower, title: 'Resumen', habilitado: true },
    { icon: faComment, title: 'Presentación', habilitado: false },
    { icon: faChartBar, title: 'Debate', habilitado: true },
    { icon: faUsers, title: 'Opinar', habilitado: true },
    { icon: faEdit, title: 'Minuta', habilitado: true }
  ];

  habilitarPresentacion = () => this.props.link !== null

  render() {
    return (
      <SidebarContainer>
        {this.menu.map((seccion) => <ElementoContainer
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
