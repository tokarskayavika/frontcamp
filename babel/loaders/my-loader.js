module.exports = function(source) {
    var data = JSON.parse(source);
    for (key of Object.keys(data)) {
        if (Number.isInteger(+key)) {
            delete data[key];
        }
    }
    return JSON.stringify(data);
};