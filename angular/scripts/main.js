var app = angular.module('toDo', ['toDo.factory', 'toDo.controllers', 'toDo.directives', 'toDo.components', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'toDoController'
        })
        .when('/:id/edit', {
            templateUrl: 'edit.html',
            controller: 'toDoController'
        })
        .when('/add', {
            templateUrl: 'add.html',
            controller: 'toDoController'
        });
});