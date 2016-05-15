

cd assets/js/backoffice

mkdir $1

cd $1

mkdir partials

mkdir directives

echo "angular.module('"$1"', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('"$1"', {
        url : '/"$1"',
        views:{
        	'': {
        		template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis deleniti maxime, nostrum quod quos, iste earum amet corrupti neque commodi quo ducimus nesciunt, ipsam sapiente accusantium similique minima, aut dicta.' 
        	}

        }
       })
});" > index.js
