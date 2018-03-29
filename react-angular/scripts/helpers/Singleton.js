export default (function () {
    let instance;

    function createInstance(callback) {
        return callback();
    }

    return {
        getInstance: function (callback) {
            if (!instance) {
                instance = createInstance(callback);
            }
            return instance;
        }
    };
})();