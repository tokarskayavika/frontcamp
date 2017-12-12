import 'whatwg-fetch';

function loadApplication() {
    import(/* webpackChunkName: "App" */
        /* webpackMode: "lazy" */ './App')
        .then(module => {
            let Application = module.default;
            let myApplication = new Application();
            myApplication.initialize();
    })
}

const initButton = document.getElementById("meow");

initButton.addEventListener("click", () => {
    loadApplication();
    initButton.remove();
});