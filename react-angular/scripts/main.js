import Singleton from './helpers/Singleton';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import UIRouter from './router/UIRouter';
import {Provider} from 'react-redux';
import store from "./ui/store";

const browserHistory = Router.browserHistory;

import '../style/main.scss';

function loadApplication() {
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router history={browserHistory}>
                <UIRouter />
            </Router>
        </Provider>,
        document.getElementById('content')
    );
}

Singleton.getInstance(loadApplication);