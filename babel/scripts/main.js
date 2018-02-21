import Singleton from './helpers/Singleton';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/App';
import('../style/default.scss');

function loadApplication() {
    ReactDOM.hydrate(<App />, document.getElementById('content'));
}

Singleton.getInstance(loadApplication);