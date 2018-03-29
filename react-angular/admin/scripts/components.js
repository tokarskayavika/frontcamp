angular.module('toDo.components', ['toDo.controllers'])
    .component('postForm', {
        templateUrl: 'static/templates/postForm.html',
        bindings: {
            post: '=',
            newPost: '=',
            savePost: '&',
            addPost: '&',
            editMode: '='
        }
    })

   .component('postElement', {
       templateUrl: 'static/templates/postElement.html',
       controller: 'toDoController',
       bindings: {
           post: '='
       }
   })

   .component('postList', {
       templateUrl: 'static/templates/postList.html',
       bindings: {
           posts: '=',
           savePost: '&',
       }
   })

   .component('pagination', {
          templateUrl: 'static/templates/pagination.html',
          controller: 'paginationController',
          bindings: {
              length: '='
          }
      });