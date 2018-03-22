angular.module('toDo.factory', ['ngResource']).factory('toDoFactory', ['$resource', function($resource) {
    var tasks = [];

    return {
        fetchTasks: function() {
            var Todos = $resource('/api/tasks');

            return Todos.query().$promise.then(function(todos) {
                tasks = todos;
            }, function(errResponse) {
                console.log(errResponse);
            });
        },

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

            var Task = $resource('/api/add');
            Task.save(JSON.stringify(newTask),
                function(response) {
                tasks.push(newTask);
            });
        },

        removeTask: function(index) {
            var Task = $resource('/api/' + index);

            return Task.delete().$promise.then(function() {
                tasks = tasks.filter(function(task) {
                    return task.index !== index;
                });
            }, function(errResponse) {
                console.log(errResponse);
            });
        },

        saveTask: function(task) {
            var Task = $resource('/api/' + task.index, null, {
                'update': { method:'PUT' }
            });

            return Task.update(JSON.stringify(task)).$promise.then(function() {

            }, function(errResponse) {
                console.log(errResponse);
            });
        },

        getTaskById: function(id) {
            return tasks[id];
        },

        sortByFirstLetter: function(tasks) {
            return tasks.sort(function(a, b) {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return -1;
                }
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                }
                return 0;
            });
        },

        sortByDate: function(tasks) {
            return tasks.sort(function(a, b) {
                return a.date - b.date;
            });
        },

        filterPlannedByDaysOld: function(days) {
            return this.getPlannedTasks().filter(function(task) {
                return task.date === days;
            });
        },

        filterDoneByDaysOld: function(days) {
            return this.getDoneTasks().filter(function(task) {
                return task.date === days;
            });
        }
    };
}]);

angular.module('toDo.controllers', []).controller('toDoController', ['$scope', '$location', '$routeParams', 'toDoFactory', function($scope, $location, $routeParams, toDoFactory) {

    (function() {
        $scope.newTask = {
            name: '',
            done: false,
            edit: false
        };

        $scope.sortValue = '';
        $scope.filterValue = '';

        toDoFactory.fetchTasks().then(function() {
            $scope.recalculateTasks();
        });

        $scope.task = $routeParams.id && toDoFactory.getTaskById($routeParams.id);
    })();

    $scope.recalculateTasks = function() {
        $scope.plannedTasks = toDoFactory.getPlannedTasks();
        $scope.doneTasks = toDoFactory.getDoneTasks();
    };

    $scope.addTask = function() {
        $scope.newTask.date = Date.now();
        toDoFactory.addTask($scope.newTask);

        $scope.newTask = {
            name: '',
            done: false,
            edit: false
        };
    };

    $scope.sortByFlag = function() {
        switch ($scope.sortValue) {
            case ('firstLetter'):
                $scope.sortByFirstLetter();
                break;
            case ('date'):
                $scope.sortByDate();
                break;
            default:
                $scope.recalculateTasks();
        }
    };

    $scope.filterByDaysOld = function() {
        var days = $scope.filterValue;

        if (days) {
            $scope.plannedTasks = toDoFactory.filterPlannedByDaysOld(days);
            $scope.doneTasks = toDoFactory.filterDoneByDaysOld(days);
        } else {
            $scope.recalculateTasks();
        }
    };

    $scope.sortByFirstLetter = function() {
        $scope.plannedTasks = toDoFactory.sortByFirstLetter($scope.plannedTasks);
        $scope.doneTasks = toDoFactory.sortByFirstLetter($scope.doneTasks);
    };

    $scope.sortByDate = function() {
        $scope.plannedTasks = toDoFactory.sortByDate($scope.plannedTasks);
        $scope.doneTasks = toDoFactory.sortByDate($scope.doneTasks);
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

    $scope.moveTask = function() {
        $scope.recalculateTasks();
        $scope.sortByFlag();
    };

    $scope.removeTask = function(index) {
        toDoFactory.removeTask(index).then(function() {
            $scope.recalculateTasks();
        });
    };

    $scope.saveTask = function(task) {
        toDoFactory.saveTask(task);
    };
}]);

