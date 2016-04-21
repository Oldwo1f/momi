angular.module('core')
  .directive('dashboard', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/dashboard.html'
    };

});