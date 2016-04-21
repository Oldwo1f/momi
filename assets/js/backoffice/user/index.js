angular.module('user', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('users', {
        url : '/users',
        views:{
        	'': {
        		template: '<users-page></users-page>' 

        	}

        }
       })

    //   $urlRouterProvider.otherwise('/dashboard');
});