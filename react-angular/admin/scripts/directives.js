angular.module('toDo.directives', []).directive('controlNameLength', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                ctrl.$setValidity('lengthValidator', ngModelValue.length >= 20);
                return ngModelValue;
            }

            ctrl.$parsers.push(customValidator);
        }

    };
});