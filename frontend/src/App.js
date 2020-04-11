import React, {useEffect, useState} from 'react';
import {Slide, toast} from 'react-toastify';
import {Route, Switch} from 'react-router-dom';
import GlobalStyle from './GlobalStyle.styled';
import EmpezarReunion from './empezar-reunion/EmpezarReunion';
import backend from './api/backend';
import './toast.css';
import {ReduxWebSocketWrapper} from './ReduxWebSocketWrapper';
import Mobile from './mobile';
import TemasHandler from './reunion/TemasHandler';
import NotFound from "./common-pages/NotFound";
import Loading from "./common-pages/Loading";
import {ThemeProvider} from "styled-components";
import {getTheme} from './styles/theme';
import Toggle from "./dark-mode/Toggle";
import {useDarkMode} from "./dark-mode/useDarkMode";

const App = ({location, usuario}) => {
  const [reunion, setReunion] = useState();
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      const reunionResponse = await backend.getReunion();
      setReunion(reunionResponse);
    };
    fetchData();
  }, []);

  if (!componentMounted) return <></>;
  const handleReunionIniciada = (nuevaReunion) => {
    setReunion(nuevaReunion);
  };

  toast.configure({
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 5000,
    transition: Slide,
  });

  if (!reunion) {
    return <Loading/>;
  }
  const contenido = reunion.abierta ?
    <ReduxWebSocketWrapper reunion={reunion} usuario={usuario}>
      <Switch>
        <Route exact path="/" component={() => <Mobile usuario={usuario}/>}/>
        <Route exact path="/presentador" component={TemasHandler}/>
        <Route path="*" component={props => <NotFound {...props} />}/>
      </Switch>
    </ReduxWebSocketWrapper> : <EmpezarReunion {...reunion} handleReunionIniciada={handleReunionIniciada}/>;

  return <ThemeProvider theme={getTheme(theme)}>
    <GlobalStyle/>
    <Toggle theme={theme} toggleTheme={toggleTheme}/>
    {contenido}
  </ThemeProvider>;
};


export default App;
