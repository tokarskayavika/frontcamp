import 'whatwg-fetch';

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

var Singleton = (function () {
    let instance;

    function createInstance() {
        return createApplication();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

Singleton.getInstance();