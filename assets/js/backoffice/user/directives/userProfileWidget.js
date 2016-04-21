angular.module('social')
  .directive('userProfileWidget', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/user/partials/userProfileWidget.html'
    };

});