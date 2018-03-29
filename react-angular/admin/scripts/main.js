var app = angular.module('toDo', ['toDo.factory', 'toDo.controllers', 'toDo.directives', 'toDo.components', 'pagination.controllers', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/templates/main.html',
            controller: 'toDoController'
        })
        .when('/:id/edit', {
            templateUrl: 'static/templates/edit.html',
            controller: 'toDoController'
        })
        .when('/add', {
            templateUrl: 'static/templates/add.html',
            controller: 'toDoController'
        });
});
