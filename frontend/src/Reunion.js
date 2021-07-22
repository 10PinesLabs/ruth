import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import GlobalStyle from './GlobalStyle.styled';
import backend from './api/backend';
import './toast.css';
import { useRuthConnectedStore } from './ReduxWebSocketWrapper';
import Mobile from './mobile';
import TemasHandler from './reunion/TemasHandler';
import Loading from './common-pages/Loading';
import { Provider } from 'react-redux';

const Reunion = ({ usuario }) => {
  const [reunion, setReunion] = useState();
  const { reunionId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const reunionResponse = await backend.getReunion(reunionId);
      setReunion(reunionResponse);
    };
    fetchData();
  }, [reunionId]);

  const store = useRuthConnectedStore(reunion);

  if (!reunion) {
    return <Loading />;
  }

  if (!store) {
    return <Loading />;
  }

  return <>
    <GlobalStyle/>
    <Provider store={store}>
      <Route exact path="/:reunionId/presentador" component={() => <TemasHandler usuario={usuario}/>}/>
      <Route exact path="/:reunionId" component={() => <Mobile usuario={usuario} participante={true}/>}/>
    </Provider>
  </>;
};


export default Reunion;
