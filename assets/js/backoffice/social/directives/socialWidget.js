angular.module('momi-social')
  .directive('socialWidget', function(){

    'use strict';

    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/social/partials/socialWidget.html'
    };

});