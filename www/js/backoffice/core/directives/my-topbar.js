angular.module('core')
  .directive('myTopbar', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/topbar.html'
    };

});