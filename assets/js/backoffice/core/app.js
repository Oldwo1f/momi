	  

(function(orig) {
  angular.modules = [];
  angular.module = function() {
    if (arguments.length > 1) {
      angular.modules.push(arguments[0]);
    }
    return orig.apply(null, arguments);
  }
})(angular.module);


var listWidgetDirectivesApp = function listWidgetDirectivesApp() {
  var listDirectives = function listDirectives(name) {
    return angular.module(name)._invokeQueue.filter(function (item) {
      return 'directive' === item[1] && item[2][0].match('Widget$');
    }).map(function (item) {
      return item[2][0];
    });
  };
  return angular.modules.map(listDirectives).reduce(function (acc, l) {
    return acc.concat(l);
  }, []);
};


angular.module('core', ['ui.router','gridster','ngSanitize','ngAnimate','social','user'])
.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('dashboard', {
        url : '/dashboard',
        // views:{
        // 	'@': {
        // 		template: '<dashboard></dashboard>' 

        // 	},
        // 	left:  {
        // 		template
        // 	}

        // }
       })

      $urlRouterProvider.otherwise('/dashboard');

}).run(['$state', function ($state) {}]);




// $(window).resize(function() {
//   height = $(window).height()-67
//   $('#page-wrapper').css({'min-height':height+'px'});
// }).resize()
$(window).load(function(){
	$('#loading').fadeOut(1000);
})