define(['scripts/controllers',
        'scripts/directives',
        'scripts/components'],

    function(controllers, directives, components) {
        var app = angular.module('toDo', ["ngRoute"]);

        controllers(app);
        components(app);
        directives(app);

        app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/main.html',
                    controller: 'toDoController'
                })
                .when('/:id/edit', {
                    templateUrl: "templates/edit.html",
                    controller: 'toDoController'
                })
                .when('/add', {
                    templateUrl: 'templates/add.html',
                    controller: 'toDoController'
                });
        });
    }
);