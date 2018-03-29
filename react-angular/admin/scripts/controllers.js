angular.module('toDo.factory', ['ngResource']).factory('toDoFactory', ['$resource', function($resource) {
    var posts = [];

    return {
        fetchPosts: function() {
            var Posts = $resource('/api/blogs');

            return Posts.query().$promise.then(function(fetchedPosts) {
                posts = fetchedPosts;
            }, function(errResponse) {
                console.log(errResponse);
            });
        },

        getPosts: function() {
            return posts;
        },

        addPost: function(newPost) {
            newPost.index = posts.length;

            var Post = $resource('/api/blogs');
            Post.save(JSON.stringify(newPost),
                function() {
                    posts.push(newPost);
                });
        },

        removePost: function(id) {
            var Post = $resource('/api/blogs/' + id);

            return Post.delete().$promise.then(function() {
                posts = posts.filter(function(post) {
                    return post._id !== id;
                });
                console.log(posts);
            }, function(errResponse) {
                console.log(errResponse);
            });
        },

        savePost: function(post) {
            var Post = $resource('/api/blogs/' + post._id, null, {
                'update': {method: 'PUT'}
            });

            return Post.update(JSON.stringify(post)).$promise.then(function() {

            }, function(errResponse) {
                console.log(errResponse);
            });
        },

        getPostById: function(id) {
            return _.findWhere(posts, {_id: id});
        },

        getPostsPerPage: function(pageNumber, itemsPerPage) {
            const firstIndex = pageNumber * itemsPerPage;
            const lastIndex = (pageNumber + 1) * itemsPerPage;

            return posts.slice(firstIndex, lastIndex);
        }
    };
}]);




angular.module('pagination.controllers', []).controller('paginationController', ['$timeout', '$scope', function($timeout, $scope) {
    var _this = this;
    $scope.itemsPerPage = 5;

    function onInit() {
        $timeout(function() {
            $scope.number = $scope.calculatePageNumber();
            $scope.setPage(0);
        }, 0);
    }

    _this.$onInit = onInit;

    $scope.setPage = function(pageNumber) {
        $scope.activePage = pageNumber;
        $scope.$emit('changePage', pageNumber, $scope.itemsPerPage);
    };

    $scope.calculatePageNumber = function() {
        return Math.ceil(_this.length / $scope.itemsPerPage);
    };
}]);




angular.module('toDo.controllers', []).controller('toDoController', ['$scope', '$location', '$routeParams', 'toDoFactory', function($scope, $location, $routeParams, toDoFactory) {

    this.$onInit = function() {
        $scope.newPost = {
            title: '',
            author: '',
            description: ''
        };

        toDoFactory.fetchPosts().then(function() {
            $scope.posts = toDoFactory.getPosts();
        });

        $scope.post = $routeParams.id && toDoFactory.getPostById($routeParams.id);
    };

    $scope.addPost = function() {
        toDoFactory.addPost($scope.newPost);

        $scope.newPost = {
            title: '',
            author: '',
            description: ''
        };
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

    $scope.removePost = function(id) {
        toDoFactory.removePost(id).then(function() {
            $scope.posts = toDoFactory.getPosts(); // почему нет рендера
        });
    };

    $scope.savePost = function(post) {
        toDoFactory.savePost(post);
    };

    $scope.$on('changePage', function(event, pageNumber, itemsPerPage) {
        $scope.posts = toDoFactory.getPostsPerPage(pageNumber, itemsPerPage);
    });
}]);

