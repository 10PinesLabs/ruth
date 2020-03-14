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
import NotFound from "./common-pages/NotFound";
import Loading from "./common-pages/Loading";

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
    return <Loading />;
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
        <Route exact path="/" component={() => <Mobile usuario={usuario}/>}/>
        <Route exact path="/oradores" component={Oradores}/>
        <Route exact path="/chart" component={TestChart}/>
        <Route exact path="/presentador" component={TemasHandler} />
        <Route path="*" component={props => <NotFound {...props} />} />
      </Switch>
    </ReduxWebSocketWrapper>
  </>;
};


export default App;
