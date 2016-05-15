angular.module('momi-user', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('users', {
        url : '/users',
        parent:'dashboard',
        views:{
            'page1': {
                template: '<users-page></users-page>',
        	}

        }
       })

    //   $urlRouterProvider.otherwise('/dashboard');
}]);