angular.module('core')
  .directive('myMenu', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/menu.html'
    };

});