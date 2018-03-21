define(function() {
    function controllers(app) {
        app.factory('toDoFactory', function() {
            var tasks = [
                {name: 'sssssssssssssssssssss999999999999999999999999999', done: false, date: 0, index: 0},
                {name: 'sssssssssssssssssssss999999999999999999999999999', done: false, date: 0, index: 1},
                {name: 'sssssssssssssssssssss999999999999999999999999999', done: false, date: 0, index: 2},
                {name: 'sssssssssssssssssssss999999999999999999999999999', done: true, date: 0, index: 3}
            ];

            return {
                getPlannedTasks: function() {
                    return _.where(tasks, {
                        done: false
                    });
                },

                getDoneTasks: function() {
                    return _.where(tasks, {
                        done: true
                    });
                },

                addTask: function(newTask) {
                    newTask.index = tasks.length;
                    tasks.push(newTask);
                },

                removeTask: function(index) {
                    tasks = tasks.filter(function(task) {
                        return task.index !== index;
                    });
                },

                getTaskById: function(id) {
                    return tasks[id];
                },

                filterByFirstLetter: function() {

                }
            };
        });

        app.controller('toDoController', ['$scope', '$location', '$routeParams', 'toDoFactory', function($scope, $location, $routeParams, toDoFactory) {
            $scope.newTask = {
                name: '',
                done: false,
                edit: false
            };

            $scope.filterByFirstLetter = '';

            $scope.recalculateTasks = function() {
                $scope.plannedTasks = toDoFactory.getPlannedTasks();
                $scope.doneTasks = toDoFactory.getDoneTasks();
            };

            $scope.recalculateTasks();

            $scope.addTask = function() {
                $scope.newTask.date = Date.now();
                toDoFactory.addTask($scope.newTask);

                $scope.newTask = {
                    name: '',
                    done: false,
                    edit: false
                };
            };

            $scope.getFilterValue = function() {
                var filterValue = $scope.filterByFirstLetter;

                if (filterValue) {
                    $scope.filterByFirstLetter($scope.plannedTasks);
                    $scope.filterByFirstLetter($scope.doneTasks);
                } else {
                    $scope.recalculateTasks();
                }
            };

            $scope.goToAddPage = function() {
                $location.url('/add');
            };

            $scope.goToEditPage = function(id) {
                $location.url(id + '/edit');
            };

            $scope.goToMainPage = function() {
                $location.url('/');
            };

            $scope.task = $routeParams.id && toDoFactory.getTaskById($routeParams.id);

            $scope.moveTask = function() {
                $scope.recalculateTasks();
            };

            $scope.removeTask = function(index) {
                toDoFactory.removeTask(index);
                $scope.recalculateTasks();
            };
        }]);
    }

    return controllers;
});

