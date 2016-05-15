angular.module('momi-user')
  .directive('userProfileWidget', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/user/partials/userProfileWidget.html'
    };

});