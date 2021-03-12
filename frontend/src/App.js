import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import GlobalStyle from './GlobalStyle.styled';
import EmpezarReunion from './empezar-reunion/EmpezarReunion';
import './toast.css';
import NotFound from './common-pages/NotFound';
import Reunion from "./Reunion";
import {Slide, toast} from "react-toastify";

const App = ({ usuario }) => {
    useEffect(() => {
        toast.configure({
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 5000,
            transition: Slide,
        });
    }, []);

    return <>
        <GlobalStyle/>
            <Switch>
                <Route exact path="/" component={() => <EmpezarReunion usuario={usuario}/>}/>
                <Route exact path="/:reunionId" component={() => <Reunion usuario={usuario} />} />
                <Route path="*" component={NotFound} />
            </Switch>
    </>;
};


export default App;
