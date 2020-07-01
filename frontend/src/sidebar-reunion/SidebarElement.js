import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SeleccionContainer, TitulosSidebar } from './Sidebar.styled';

const SidebarElement  = ({isActive, icon, title}) => {

  return (
      <SeleccionContainer isActive={isActive}>
        <TitulosSidebar><FontAwesomeIcon icon={icon}  /> {title}</TitulosSidebar>
      </SeleccionContainer>
  );

}

export default SidebarElement;
