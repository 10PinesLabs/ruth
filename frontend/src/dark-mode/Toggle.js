import React from 'react';
import Switch from "@material-ui/core/Switch";
import {Icon, SwitchContainer} from "./Toggle.styled";

const Toggle = ({theme, toggleTheme}) => {
  const isLight = theme === 'light';
  return <SwitchContainer>
    <Switch onChange={toggleTheme}
            checked={!isLight}
            size='medium'
            edge='start'
            color="#68C9B2"
            icon={<Icon src={'./sun.svg'} />}
            checkedIcon={<Icon src='./moon.svg' /> }
            />
  </SwitchContainer>
};

export default Toggle;
