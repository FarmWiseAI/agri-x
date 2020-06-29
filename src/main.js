import React, { useState } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { message } from 'antd';
import Header from './components/header';
import RiceMap from './components/map/RiceMap';
import DrawMap from './components/map/DrawMap';
import Analysis from './components/analysis';
import Draw from './components/draw';
import UploadModal from './components/map/UploadModal';

message.config({
    top: 100,
    maxCount: 1,
    duration: 5
});

function Main(props) {
    const [showDraw, toggleDraw] = useState(false);
    const [showUpload, toggleUploadModal] = useState(false);
    const [logged, setLog] = useState(false);
    const routes = [
        { path: "/", component: <DrawMap logged={logged} /> },
        { path: "/analysis", component: <Analysis /> },
        { path: "/results", component: <RiceMap logged={logged} /> }
    ];
    const getRoutes = () => {
        if (logged) {
            return routes.map(e => (
                <Route exact path={e.path} >
                    {e.component}
                </Route>)
            )
        } else {
            return (<Route path="*">{routes[0].component}</Route>);
        }
    }

    return (
        <HashRouter>
            <Header key='header' toggleDraw={toggleDraw} showDraw={showDraw} logged={logged} setLog={setLog} />
            <Draw showDraw={showDraw} toggleDraw={toggleDraw} showUpload={toggleUploadModal} />
            {showUpload && <UploadModal open={showUpload} close={() => toggleUploadModal(false)} />}
            <Switch>
                {getRoutes()}
            </Switch>
        </HashRouter>
    )
}

export default Main;
