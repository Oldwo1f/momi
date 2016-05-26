

angular.module('momi-login', ['ui.router','satellizer','trTrustpass'])
.config(function ($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state('login', {
      url: '/login',
      views:{
        	'pagelogin': {
        		templateUrl: 'js/backoffice/login/login.html',
        		controller:'loginCtrl',
        	}

	   }
    })
    .state('logout', {
        url: '/logout',
        views:{
          'pagelogin': {
            template: null,
            controller:'logoutCtrl',
          }

     }
    })
    .state('firstconnexion', {
        url: '/firstconnexion/:idfirst/:loginemail',
        views:{
        	'pagelogin': {
        		templateUrl: 'js/backoffice/login/firstConnexion.html',
        		controller:'firstConnexionCtrl',
        	}

	   }
    })

   //  .state('home',{
   //    url: '/home',
   //    templateUrl: '…',
   //    resolve: {
   //      redirectIfNotAuthenticated: _redirectIfNotAuthenticated
   //    },
   //   controller: 'HomeCtrl as home'
   // })

});
angular.module('momi-login')
.controller('loginCtrl', function ($rootScope,$scope,$auth,$state,$sailsSocket){
    
	$scope.user={};
  $scope.errorlogin = '';
  
    $scope.login = function() {
      $scope.errorlogin = '';
      $auth.login($scope.user)
        .then(function(data) {
          userService.selfProfile($auth.getPayload().sub).then(function(){
              $sailsSocket.defaults.headers.common.Authorization = 'Bearer '+ $auth.getToken();
              $state.go('dashboard');
          })
          
        })
        .catch(function(error) {
          console.log(error.data.message, error.status);
          $scope.errorlogin = 'Erreur dans l\'email ou le mot de passe';
          console.log($scope.errorlogin);
        });
    };

    $scope.$on('$stateChangeSuccess',function (e,toState,toParams,fromState,fromParams){
    	console.log('hrtrrrrrrrrrr');
    	// setTimeout(function(){
    
		  height = $(window).height()
		  $('.containerLogin').css({'height':height+'px'});
	  	// },100)
        

            
    });
   

})
.controller('logoutCtrl', function($state, $auth) {
    // if (!$auth.isAuthenticated()) { return; }

    console.log('LOGOUT');
    $auth.logout()
      .then(function() {
        console.log('LOGGEd OUT');
        $state.go('login');
      });
})
.controller('firstConnexionCtrl', function ($sailsSocket,$rootScope,$scope,$auth,$state,$stateParams,userService){
    // if (!$auth.isAuthenticated()) { return; }
    $scope.user={};
    console.log('firstConnexionCtrl');
    $scope.login = function() {
      var user={};
      user.email = $stateParams.loginemail;
      user.password = $scope.password;
      console.log($scope.password);
      console.log($stateParams.idfirst);


      userService.firstConnexion($stateParams.idfirst,$scope.password).then(function(){

        console.log('COOL Cest fini');
        console.log(user);
        $auth.login(user)
        .then(function() {
          console.log('You have successfully signed in!');
          console.log($auth.getToken());
          $sailsSocket.defaults.headers.common.Authorization = 'Bearer '+ $auth.getToken();
          $state.go('dashboard');
        })
        .catch(function(error) {
          console.log(error.data.message, error.status);
        });
        
      }).catch(function(e){
        console.log(e);
        console.log('eeeeeror');
        
      })
      // $auth.login($scope.user)
      //   .then(function() {
      //     console.log('You have successfully signed in!');
      //     console.log($auth.getToken());
      //     $sailsSocket.defaults.headers.common.Authorization = 'Bearer '+ $auth.getToken();
      //     $state.go('dashboard');
      //   })
      //   .catch(function(error) {
      //     console.log(error.data.message, error.status);
      //   });
    };

    $scope.$on('$stateChangeSuccess',function (e,toState,toParams,fromState,fromParams){
      height = $(window).height()
      $('.containerLogin').css({'height':height+'px'});
      // },100)
    });
});
