import React, { useEffect, useState } from 'react';
import { Slide, toast } from 'react-toastify';
import {Route, Switch, useParams} from 'react-router-dom';
import GlobalStyle from './GlobalStyle.styled';
import EmpezarReunion from './empezar-reunion/EmpezarReunion';
import backend from './api/backend';
import './toast.css';
import { useRuthConnectedStore } from './ReduxWebSocketWrapper';
import Mobile from './mobile';
import TemasHandler from './reunion/TemasHandler';
import NotFound from './common-pages/NotFound';
import Loading from './common-pages/Loading';
import { Provider } from 'react-redux';

const Reunion = ({ usuario }) => {
  const [reunion, setReunion] = useState();
  const { reunionId } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const reunionResponse = await backend.getReunion(reunionId);
      setReunion(reunionResponse);
    };
    fetchData();
  }, []);

  const store = useRuthConnectedStore(reunion);

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

  if (!store) {
    return <Loading />;
  }

  return <>
    <GlobalStyle/>
    <Provider store={store}>
        <Route exact path="/:reunionId/presentador" component={() => <TemasHandler usuario={usuario} />} />
        <Route exact path="/:reunionId/" component={() => <Mobile usuario={usuario}/>}/>
    </Provider>
  </>;
};


export default Reunion;
