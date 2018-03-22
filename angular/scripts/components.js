angular.module('toDo.components', []).component('taskForm', {
   templateUrl: 'taskForm.html',
       bindings: {
           task: '=',
           newTask: '=',
           saveTask: '&',
           addTask: '&',
           editMode: '='
       }
   })

   .component('taskElement', {
       templateUrl: 'taskElement.html',
       bindings: {
           task: '=',
           saveTask: '&',
           goToEditPage: '&',
           removeTask: '&',
           moveTask: '&'
       }
   });