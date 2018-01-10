import 'whatwg-fetch';
import Singleton from './helpers/Singleton';

function loadApplication() {
    import('./App').then(module => {
        let Application = module.default;
        let myApplication = new Application();
        myApplication.initialize();
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