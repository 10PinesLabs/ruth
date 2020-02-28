import React, { useEffect, useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from './GlobalStyle.styled';
import EmpezarReunion from './empezar-reunion/EmpezarReunion';
import backend from './api/backend';
import './toast.css';
import { ReduxWebSocketWrapper } from './ReduxWebSocketWrapper';
import Mobile from './mobile';
import Oradores from './oradores';
import TestChart from './chart';
import TemasHandler from './reunion/TemasHandler';

const App = ({ location, usuario }) => {
  const [reunion, setReunion] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const reunionResponse = await backend.getReunion();
      setReunion(reunionResponse);
    };
    fetchData();
  }, []);

  const handleReunionIniciada = (nuevaReunion) => {
    setReunion(nuevaReunion);
  };

  toast.configure({
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 5000,
    transition: Slide,
  });

  if (!reunion) {
    return <div>Cargando</div>;
  }


  if (reunion.abierta !== true) {
    return <>
      <GlobalStyle/>
      <EmpezarReunion {...reunion} handleReunionIniciada={handleReunionIniciada}/>)}/>
    </>;
  }

  return <>
    <GlobalStyle/>
    <ReduxWebSocketWrapper reunion={reunion} usuario={usuario}>
      <Switch>
        <Route exact path="/mobile" component={() => <Mobile usuario={usuario}/>}/>
        <Route exact path="/oradores" component={Oradores}/>
        <Route exact path="/chart" component={TestChart}/>
        <Route exact path="/" component={TemasHandler} />
      </Switch>
    </ReduxWebSocketWrapper>
  </>;
};


export default App;
