angular.module('momi-categories', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    
     //  $stateProvider.state('categories', {
     //    url : '/categories',
	    // parent:'dashboard',

     //    views:{
     //    	'page1': {
     //    		template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis deleniti maxime, nostrum quod quos, iste earum amet corrupti neque commodi quo ducimus nesciunt, ipsam sapiente accusantium similique minima, aut dicta.' 
     //    	}

     //    }
     //   })

      $stateProvider
	    .state('categories', {
	        url : '/categories',
	        params:{
	        	sort:'name ASC',
	        	page:1,
	        	nbPerPage : 10
	    	},
	        parent:'dashboard',
	        views:{
	        	'page1': {
	        		template: '<categories categories-list="categoriesList"></categories>',
	        		controller:function($scope, categoriesList){
	        			console.log(categoriesList);
	        			$scope.categoriesList = categoriesList;
	        		},
	        		resolve:{
	                    categoriesList :  function(categoryService, $stateParams){
	                        

	                        console.log('RESOLVE');
	                        console.log($stateParams);
	                        return categoryService.fetch($stateParams.sort,$stateParams.page,$stateParams.nbPerPage)
	                    }
	                }
	        	}

	        }
       	})
      	// .state('add', {
	      //   url : '/add',
	      //   parent:'blog',
	      //   views:{
	      //   	'page2@dashboard': {
	      //   		template: '<add-article new-article="newArticle"></add-article>',
	      //   		controller:function($scope, newArticle){
	      //   			$scope.newArticle = newArticle;
	      //   		},
	      //   		resolve:{
	      //               newArticle :  function(articleService){
	                        
	      //                   return articleService.createBlank()
	      //               }
	      //           }
	      //   	}

	      //   }
       // 	})
      	// .state('edit', {
	      //   url : '/edit/:id',
	      //   parent:'blog',
	      //   views:{
	      //   	'page2@dashboard': {
	      //   		template: '<add-article new-article="newArticle"></add-article>',
	      //   		controller:function($scope, newArticle){
	      //   			$scope.newArticle = newArticle;
	      //   		},
	      //   		resolve:{
	      //               newArticle :  function(articleService,$stateParams){
	                        
	      //                   return articleService.fetchOne($stateParams.id)
	      //               }
	      //           }
	      //   	}

	      //   }
       // 	})
});
