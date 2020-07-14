import React, {useEffect, useState} from 'react';
import {Slide, toast} from 'react-toastify';
import {Route, Switch} from 'react-router-dom';
import GlobalStyle from './GlobalStyle.styled';
import EmpezarReunion from './empezar-reunion/EmpezarReunion';
import backend from './api/backend';
import './toast.css';
import {useRuthConnectedStore} from './ReduxWebSocketWrapper';
import Mobile from './mobile';
import TemasHandler from './reunion/TemasHandler';
import NotFound from './common-pages/NotFound';
import Loading from './common-pages/Loading';
import {Provider} from 'react-redux';

const App = ({ usuario }) => {
  const [reunion, setReunion] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const reunionResponse = await backend.getReunion();
      setReunion(reunionResponse);
    };
    fetchData();
  }, []);

  const store = useRuthConnectedStore(reunion);

  const handleReunionIniciada = (nuevaReunion) => {
    setReunion(nuevaReunion);
  };

  useEffect(() => {
    toast.configure({
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 5000,
      transition: Slide,
    });
  }, []);

  if (!reunion) {
    return <Loading />;
  }

  if (reunion.abierta !== true) {
    return <>
      <GlobalStyle/>
      <EmpezarReunion {...reunion} handleReunionIniciada={handleReunionIniciada}/>)}/>
    </>;
  }

  if (!store) {
    return <Loading />;
  }

  return <>
    <GlobalStyle/>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={() => <Mobile usuario={usuario}/>}/>
        <Route exact path="/presentador" component={() => <TemasHandler usuario={usuario} />} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Provider>
  </>;
};


export default App;
