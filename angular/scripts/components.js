define(function(require, exports, module) {
    function Components(app) {
        app.component('taskForm', {
            templateUrl: 'templates/taskForm.html',
            bindings: {
                task: '=',
                newTask: '=',
                saveTask: '&',
                addTask: '&',
                editMode: '='
            }
        });

        app.component('taskElement', {
            templateUrl: 'templates/taskElement.html',
            bindings: {
                task: '=',
                saveTask: '&',
                goToEditPage: '&',
                removeTask: '&',
                moveTask: '&'
            }
        });
    }

    module.exports = Components;
});