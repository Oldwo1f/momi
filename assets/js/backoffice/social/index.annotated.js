angular.module('momi-social', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('social', {
        url : '/social',
        parent:'dashboard',
        views:{
        	'page1': {
        		template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis deleniti maxime, nostrum quod quos, iste earum amet corrupti neque commodi quo ducimus nesciunt, ipsam sapiente accusantium similique minima, aut dicta.' 

        	}

        }
       })

    //   $urlRouterProvider.otherwise('/dashboard');
}]);