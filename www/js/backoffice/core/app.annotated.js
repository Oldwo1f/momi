angular.module('core', ['ui.router','gridster'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('/dashboard', {
        url : '/dashboard',
        views:{
        	'': {
        		template: '<dashboard></dashboard>' 

        	}

        }
        // template:'<div>totototototo</div>',
     //    controller: function($scope) {
	    // 	console.log('homeController');
	    // },
	    // resolve: {
		   //  myResolve1: function() {
		   //  	console.log('resolve');
		   //      return true;
		   //    }
		   //  },
       })
     //  .state('/.dashboard', {
     //    url : 'dashboard',
     //    // template:'<div>totototototo</div>',
     // //    controller: function($scope) {
	    // // 	console.log('dash');
	    // // },
	    // // resolve: {
		   // //  myResolve1: function() {
		   // //  	console.log('resolve dash');
		   // //      return true;
		   // //    }
		   // //  },
		   // views:{
		   // 	'':{
     //    		templateUrl: 'js/backoffice/core/partials/home.html'
		   		
		   // 	}
		   // }
     //   })
    // $stateProvider
    //   .state('home2', {
    //     url : '/page2',
    //     templateUrl: 'partials/home.html'
    //    })

//       // $state.go('home');
      $urlRouterProvider.otherwise('/dashboard');
}]);




// $(window).resize(function() {
//   height = $(window).height()-67
//   $('#page-wrapper').css({'min-height':height+'px'});
// }).resize()
$(window).load(function(){
	$('#loading').fadeOut(1000);
})