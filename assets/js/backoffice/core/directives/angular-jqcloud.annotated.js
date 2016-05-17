/*!
 * Angular jQCloud 1.0.2
 * For jQCloud 2 (https://github.com/mistic100/jQCloud)
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

angular.module('core').directive('jqcloud', ['$parse', function($parse) {
  

  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    scope: {
      words: '=words',
      myoptions:'=myoptions',
      afterCloudRender: '&',
    },
    link: function($scope, $elem, $attr) {
      
      console.log($scope.myoptions);

      if ($scope.afterCloudRender) {
        $scope.myoptions.afterCloudRender = $scope.afterCloudRender;
      }
      // console.log(this);
      jQuery($elem).jQCloud($scope.words, $scope.myoptions);

      $scope.$watchCollection('words', function() {

        console.log('WATCHWORDS');
        $scope.$evalAsync(function() {
          var words = [];
          $.extend(words,$scope.words);
          jQuery($elem).jQCloud('update', words);
        });
      });
      $scope.$watchCollection('words', function() {

        console.log('WATCHWORDS');
        $scope.$evalAsync(function() {
          var words = [];
          $.extend(words,$scope.words);
          jQuery($elem).jQCloud('update', words);
        });
      });

      $elem.bind('$destroy', function() {
        jQuery($elem).jQCloud('destroy');
      });
    }
  };
}]);