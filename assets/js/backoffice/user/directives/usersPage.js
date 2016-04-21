angular.module('user')
  .directive('usersPage', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/user/partials/users.html'
    };

});