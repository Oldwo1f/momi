angular.module('momi-blog')
  .directive('blog', function(articleService){

    'use strict';

    return {
      
      	scope: {
      		articlesList:'=',
      	},
		replace: true,
		templateUrl: 'js/backoffice/blog/partials/blog.html',
		controller:function($scope,$rootScope,userService,articleService,tagService,imageService,documentService,$sailsSocket,$stateParams,$state,usSpinnerService){
			console.log($scope.articlesList);

			$scope.returnParentState=function(){
				// console.log('returnParentState BLOG');
				$state.go('^')
			}
			$scope.returnDashboardState=function(){
				// console.log('returnDashboardState BLOG');
				$state.go('dashboard')
			}
			$scope.goCategoriesState=function(){
				// console.log('returnDashboardState BLOG');
				$state.go('categories')
			}
			
			$scope.returnPreviousState=function(){
				if($rootScope.previousState){
					$state.go($rootScope.previousState.name, $rootScope.previousStateParams)
				}else{
					$state.go('^')
				}
			}

			$scope.sort=$stateParams.sort ? $stateParams.sort : 'date DESC' ;
			$scope.page=$stateParams.page ? $stateParams.page : 1 ;
			$scope.nbPerPage=$stateParams.nbPerPage ? $stateParams.nbPerPage : 10 ;
			$scope.fin = false;
			$scope.spinneropts = {
			  lines: 7 // The number of lines to draw
			, length: 0 // The length of each line
			, width: 20 // The line thickness
			, radius: 20 // The radius of the inner circle
			, scale: 0.5 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#1c7dfa' // #rgb or #rrggbb or array of colors
			, opacity: 0.02 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 0.9 // Rounds per second
			, trail: 59 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'myArticleSpinner' // The CSS class to assign to the spinner
			, top: 'auto' // Top position relative to parent
			, left: 'auto' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'relative' // Element positioning
			};
			$scope.startSpin = function(){
				console.log('STARTSPIN');
            	usSpinnerService.spin('articleSpinner');
	        }
	        $scope.stopSpin = function(){
	                
	            usSpinnerService.stop('articleSpinner');
	        }



			$scope.fetchArticles=function(){
				articleService.fetch($scope.sort,$scope.page,$scope.nbPerPage).then(function(data){
					$scope.articlesList = data;
				})
			}
			$scope.pagin=1;
			$scope.myPagingFunction=function(){
				if(!$scope.searchSlug && !$scope.fin){
					$scope.startSpin();
					$scope.pagin++;
					articleService.fetch($scope.sort,$scope.pagin,10).then(function(data){
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.articlesList = _.union($scope.articlesList , data);
						}
						$scope.stopSpin()
					})
				}
			}
				$scope.blurSearch= 0;
			$scope.searchArticle=function(){
				if($scope.searchSlug){
					if($scope.blurSearch== 0){
						articleService.search($scope.searchSlug,$scope.sort).then(function(data){
							$scope.articlesList = data;
						}).catch(function(e){
							console.log('err');
							console.log(e);
						})
					}else if($scope.blurSearch== 1){
						articleService.search($scope.searchSlug,$scope.sort).then(function(data){
							$scope.articlesList = data;
							$scope.blurSearch = 2;
						}).catch(function(e){
							console.log('err');
							console.log(e);
						})
					}else if($scope.blurSearch== 2){
						console.log('$scope.searchSlug');
						$scope.blurSearch = 0;
					}
				}else{
					articleService.fetch($scope.sort,0,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.articlesList = data;
						}
						$scope.stopSpin()
					})
				}
			}

			$scope.blurOnEnter=function($event,$element) {
				if($event.keyCode == 13){
					// $event.currentTarget.blur()
					console.log('ON ENTER');
					$scope.blurSearch = 1;	
					$scope.searchArticle();
				}else{
					$scope.blurSearch = 0;
				}
				
			}
			$scope.changeSort=function(type){
				switch(type)
				{
					case 'date':
						if($scope.sort == 'date DESC'){
							$scope.sort =	'date ASC'
						}else{
						 	$scope.sort =	'date DESC'
						}
					break;
					case 'status':
						if($scope.sort == 'status DESC'){
							$scope.sort =	'status ASC'
						}else{
						 	$scope.sort =	'status DESC'
						}
					break;
					case 'nbView':
						if($scope.sort == 'nbView DESC'){
							$scope.sort =	'nbView ASC'
						}else{
						 	$scope.sort =	'nbView DESC'
						}
					break;
				}
				// $stateParams.sort = $scope.sort;
				console.log($scope.sort);
				$state.transitionTo('blog', { sort: $scope.sort,page:$scope.page,nbPerPage:$scope.nbPerPage}, {location:true});
				console.log('fetchArticles');
				// $scope.fetchArticles()
				
			}	
			$scope.update=function(articleid,attribute,value){
				console.log(articleid);
				$rootScope.startSpin();
				var attrToUpdate = {};
				attrToUpdate[attribute] = value;
				articleService.update(articleid,attrToUpdate).then(function(data){
					console.log('----------------------------------------------------------');
					console.log(data);
					// console.log($scope.$parent);
					// $rootScope.$broadcast('articleSelfChange',data);

        			$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}	
			$rootScope.$on('articleSelfChange',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.articlesList[index] = data;
					}
			})		
			$rootScope.$on('articleSelfAdd',function(e,data){
				// console.log(id);
				console.log('articleSelfAdd');
					$scope.articlesList.unshift(data)
			})			
			$rootScope.$on('articleSelfRemove',function(e,id){
				console.log(id);
				console.log('articleSelfRemove');
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == id; });

					console.log($scope.articlesList);
					console.log(index);
					if( index !== -1) {
						console.log('index !== -1');
						$scope.articlesList.splice(index,1)
						console.log($scope.articlesList);
					}
			})	
			$rootScope.$on('articleSelfChangeImg',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.articlesList[index].images = data.images;
					}
			})	
			$rootScope.$on('articleSelfChangeDoc',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.articlesList[index].document = data.document;
					}
			})	
			$rootScope.$on('articleSelfChangeTag',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.articlesList[index].tags = data.tags;
					}
			})	
			$rootScope.$on('articleSelfChangeCat',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.articlesList[index].categories = data.categories;
					}
			})
			$rootScope.$on('articleSelfChangeAuthorAdd',function(e,data){
				console.log('articleSelfChangeAuthorADD');
				console.log(data);
				var articleId= data.data.parent.id;
				var authorId = data.addedAuthorId;
				console.log(articleId);
					var index = _.findIndex($scope.articlesList, function(o) { return o.id == articleId; });
					console.log(index);
					if( index !== -1) {
						userService.fetchOne(authorId).then(function(author){
							console.log('final author fetch==>');
							console.log(author);
							$scope.articlesList[index].authors.push(author)

						},function(d){
							console.log('EROOR');
						})
					}
			})
			$rootScope.$on('articleSelfChangeAuthorRemove',function(e,data){
				console.log('articleSelfChangeAuthorRemove');
				console.log(data);
				var articleId= data.data.id;
				var authorId = data.removedAuthorId;
				console.log(articleId);
				var index = _.findIndex($scope.articlesList, function(o) { return o.id == articleId; });
				console.log(index);
				if( index !== -1) {
						var index2 = _.findIndex($scope.articlesList[index].authors, function(o) { return o.id == authorId; });
						if( index2 !== -1)
							$scope.articlesList[index].authors.splice(index2,1)

				}	
			})

			    $sailsSocket.subscribe('article',function(data){
			        console.log('ON ARTICLE');
			        console.log(data);
			        if(data.verb =='created'){
			        	// articleService.fetchOne(data.id).then(function(data2){
			        		// console.log(data2);
			        		$scope.articlesList.unshift(data.data)
			        		
			        	// })
			        	
			        }else
			        if(data.verb =='updated'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			        	var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						if( index !== -1) {
							
							console.log($scope.articlesList[index]);
							_.merge($scope.articlesList[index], data.data)
							console.log(data.id);
							// $scope.$broadcast('ellipsContent-'+data.id);
						}
			        }else
			        if(data.verb =='destroyed'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			        	var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						if( index !== -1) {
							
							console.log($scope.articlesList[index]);
							$scope.articlesList.splice(index,1)
							// console.log(data.id);
							// $scope.$broadcast('ellipsContent-'+data.id);
						}
			        }else
			        if(data.verb =='addedTo'){
							console.log('addedTO');
							var articleTochange = _.find($scope.articlesList, function(o){ return o.id == data.id})

							if(data.attribute == 'tags'){

								if(articleTochange){
									if(typeof(articleTochange.tags) == 'undefined'){
									articleTochange.tags = [];
									}
								tagService.fetchOne(data.addedId).then(function(tag){
									console.log(tag);
									articleTochange.tags.push(tag)

								},function(d){
									console.log('EROOR');
								})
								}
							}else
							if(data.attribute == 'categories'){

								console.log('categories');
								console.log(data.addedId);
								if(typeof(articleTochange.categories) == 'undefined'){
									articleTochange.categories = [];
								}
								categoryService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									articleTochange.categories.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'images'){

								console.log('images');
								console.log(data.addedId);
								if(typeof(articleTochange.images) == 'undefined'){
									articleTochange.images = [];
								}
								imageService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									articleTochange.images.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'documents'){

								console.log('documents');
								console.log(data.addedId);
								if(typeof(articleTochange.documents) == 'undefined'){
									articleTochange.documents = [];
								}
								documentService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									articleTochange.documents.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'authors'){

								console.log('authors');
								console.log(data.addedId);
								console.log(articleTochange);
								if(typeof(articleTochange.authors) == 'undefined'){
									articleTochange.authors = [];
								}
								userService.fetchOne(data.addedId).then(function(author){
									articleTochange.authors.push(author)

								},function(d){
									console.log('EROOR');
								})
							}

						}else
						if(data.verb =='removedFrom'){
							console.log('removeFrom');
							var articleTochange = _.find($scope.articlesList, function(o){ return o.id == data.id})

							if(data.attribute == 'tags'){
								var index = _.findIndex(articleTochange.tags, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									articleTochange.tags.splice(index,1)
								}
							}
							if(data.attribute == 'categories'){
								var index = _.findIndex(articleTochange.categories, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									articleTochange.categories.splice(index,1)
								}
							}
							if(data.attribute == 'images'){
								var index = _.findIndex(articleTochange.images, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									articleTochange.images.splice(index,1)
								}
							}
							if(data.attribute == 'documents'){
								var index = _.findIndex(articleTochange.documents, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									articleTochange.documents.splice(index,1)
								}
							}
							if(data.attribute == 'authors'){
								var index = _.findIndex(articleTochange.authors, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									articleTochange.authors.splice(index,1)
								}
							}

						}
			    })
				$sailsSocket.subscribe('category',function(data){
			        console.log('ON category');
			        console.log(data);
			        if(data.verb =='created'){

			        	// $scope.articlesList.unshift(data.data)
			        	
			        }else
			        if(data.verb =='updated'){

			        	console.log('updated');
			        	console.log(data.id);
			        	// console.log($scope.articlesList);

			        	for(var i in $scope.articlesList){
			        		console.log($scope.articlesList[i]);

			        		if($scope.articlesList[i].categories.length)
			        		{
			        			var index = _.findIndex($scope.articlesList[i].categories, function(o) { return o.id == data.id; });
								if( index !== -1) {
									console.log(data.data);
									// $scope.articlesList[i].categories.splice(index,1,data.data)
									_.merge($scope.articlesList[i].categories[index], data.data)
								}
			        		}
			        	}
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			   //      	var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							
						// 	console.log($scope.articlesList[index]);
						// 	_.merge($scope.articlesList[index], data.data)
						// 	console.log(data.id);
						// 	// $scope.$broadcast('ellipsContent-'+data.id);
						// }
			        }else
			        if(data.verb =='destroyed'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			   //      	var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							
						// 	console.log($scope.articlesList[index]);
						// 	$scope.articlesList.splice(index,1)
						// 	// console.log(data.id);
						// 	// $scope.$broadcast('ellipsContent-'+data.id);
						// }
			        }
			    })
		},
		link:function(scope,element,attrs){
			
		}
    };

});