angular.module('core')
.directive('inputcount', ['$compile', function($compile) {
    return {

      restrict: 'A',
      scope: {maxChar:'=inputcount',model:'=ngModel'},
      template:'',
      controller:['$scope', function($scope) {
          $scope.remaining= $scope.maxChar;
      }],
      link:function(scope, element, attrs) {
        
        $input = $(element)
        $input.after($compile('<div class="inlinecountdown">{{remaining}}</div>')(scope));
        $input.on('input propertychange',function(e) {
            scope.model = $(this).val()
            scope.remaining = scope.maxChar - scope.model.length;
            if(scope.remaining <= 0)
            {
              scope.remaining=0;
              scope.model = scope.model.substr(0,scope.maxChar)
              $(this).val(scope.model)
            }
        })
      }
    };
  }]);