import 'whatwg-fetch';
import Singleton from './helpers/Singleton';
import React from 'react';
import ReactDOM from 'react-dom';

function loadApplication() {
    import('./react/App').then(module => {
        let App = module.default;
        ReactDOM.render(<App />, document.getElementById('main-section'));
    });

	import('../style/stylesheet.scss');
}

function createApplication() {
    const initButton = document.getElementById("meow");

    initButton.addEventListener("click", () => {
        loadApplication();
        initButton.remove();
    });
}

Singleton.getInstance(createApplication);