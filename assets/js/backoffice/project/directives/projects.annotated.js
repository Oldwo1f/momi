angular.module('momi-projects')
  .directive('projects', ["projectService", function(projectService){

    'use strict';

    return {
      
      	scope: {
      		projectsList:'=',
      	},
		replace: true,
		templateUrl: 'js/backoffice/project/partials/projects.html',
		controller:["$scope", "$rootScope", "userService", "projectService", "tagService", "imageService", "documentService", "$sailsSocket", "$stateParams", "$state", "usSpinnerService", function($scope,$rootScope,userService,projectService,tagService,imageService,documentService,$sailsSocket,$stateParams,$state,usSpinnerService){
			console.log($scope.projectsList);

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
			, className: 'myProjectSpinner' // The CSS class to assign to the spinner
			, top: 'auto' // Top position relative to parent
			, left: 'auto' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'relative' // Element positioning
			};
			$scope.startSpin = function(){
				console.log('STARTSPIN');
            	usSpinnerService.spin('projectSpinner');
	        }
	        $scope.stopSpin = function(){
	                
	            usSpinnerService.stop('projectSpinner');
	        }



			$scope.fetchProjects=function(){
				console.log('fetchProjects');
				projectService.fetch($scope.sort,$scope.page,$scope.nbPerPage).then(function(data){
					$scope.projectsList = data;
				})
			}
			$scope.pagin=1;

			$scope.myPagingFunction=function(){
				if(!$scope.searchSlug && !$scope.fin){
					$scope.startSpin();
					$scope.pagin++;
					console.log('myPagingFunction');
					projectService.fetch($scope.sort,$scope.pagin,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.projectsList = _.union($scope.projectsList , data);

						}
						$scope.stopSpin()
					})
				}
			}
				$scope.blurSearch= 0;
			$scope.searchProject=function(){
				console.log('SEARCHARTICLE');
				if($scope.searchSlug){
					if($scope.blurSearch== 0){
						console.log('$scope.searchSlug');
						console.log($scope.searchSlug);
						projectService.search($scope.searchSlug,$scope.sort).then(function(data){
							console.log(data);
							$scope.projectsList = data;
						}).catch(function(e){
							console.log('err');
							console.log(e);
						})
					}else if($scope.blurSearch== 1){
						console.log('$scope.searchSlug');
						console.log($scope.searchSlug);
						projectService.search($scope.searchSlug,$scope.sort).then(function(data){
							console.log(data);
							$scope.projectsList = data;
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
					projectService.fetch($scope.sort,0,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.projectsList = data;
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
					$scope.searchProject();
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
				$state.transitionTo('projects', { sort: $scope.sort,page:$scope.page,nbPerPage:$scope.nbPerPage}, {location:true});
				console.log('fetchProjects');
				// $scope.fetchProjects()
				
			}	
			$scope.update=function(projectid,attribute,value){
				console.log(projectid);
				$rootScope.startSpin();
				var attrToUpdate = {};
				attrToUpdate[attribute] = value;
				projectService.update(projectid,attrToUpdate).then(function(data){
					console.log('----------------------------------------------------------');
					console.log(data);
					// console.log($scope.$parent);
					// $rootScope.$broadcast('projectSelfChange',data);

        			$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}	
			$rootScope.$on('projectSelfChange',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.projectsList[index] = data;
					}
			})		
			$rootScope.$on('projectSelfAdd',function(e,data){
				// console.log(id);
				console.log('projectSelfAdd');
					$scope.projectsList.unshift(data)
			})			
			$rootScope.$on('projectSelfRemove',function(e,id){
				console.log(id);
				console.log('projectSelfRemove');
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == id; });

					console.log($scope.projectsList);
					console.log(index);
					if( index !== -1) {
						console.log('index !== -1');
						$scope.projectsList.splice(index,1)
						console.log($scope.projectsList);
					}
			})	
			$rootScope.$on('projectSelfChangeImg',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.projectsList[index].images = data.images;
					}
			})	
			$rootScope.$on('projectSelfChangeDoc',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.projectsList[index].document = data.document;
					}
			})	
			$rootScope.$on('projectSelfChangeTag',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.projectsList[index].tags = data.tags;
					}
			})	
			$rootScope.$on('projectSelfChangeCat',function(e,data){
				console.log(data);
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
					if( index !== -1) {
						$scope.projectsList[index].categories = data.categories;
					}
			})
			$rootScope.$on('projectSelfChangeAuthorAdd',function(e,data){
				console.log('projectSelfChangeAuthorADD');
				console.log(data);
				var projectId= data.data.parent.id;
				var authorId = data.addedAuthorId;
				console.log(projectId);
					var index = _.findIndex($scope.projectsList, function(o) { return o.id == projectId; });
					console.log(index);
					if( index !== -1) {
						userService.fetchOne(authorId).then(function(author){
							console.log('final author fetch==>');
							console.log(author);
							$scope.projectsList[index].authors.push(author)

						},function(d){
							console.log('EROOR');
						})
					}
			})
			$rootScope.$on('projectSelfChangeAuthorRemove',function(e,data){
				console.log('projectSelfChangeAuthorRemove');
				console.log(data);
				var projectId= data.data.id;
				var authorId = data.removedAuthorId;
				console.log(projectId);
				var index = _.findIndex($scope.projectsList, function(o) { return o.id == projectId; });
				console.log(index);
				if( index !== -1) {
						var index2 = _.findIndex($scope.projectsList[index].authors, function(o) { return o.id == authorId; });
						if( index2 !== -1)
							$scope.projectsList[index].authors.splice(index2,1)

				}	
			})

			    $sailsSocket.subscribe('project',function(data){
			        console.log('ON ARTICLE');
			        console.log(data);
			        if(data.verb =='created'){
			        	// projectService.fetchOne(data.id).then(function(data2){
			        		// console.log(data2);
			        		$scope.projectsList.unshift(data.data)
			        		
			        	// })
			        	
			        }else
			        if(data.verb =='updated'){
			        	// _.find($scope.projectsList,function(o) { return o.age < 40; });
			        	var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
						if( index !== -1) {
							
							console.log($scope.projectsList[index]);
							_.merge($scope.projectsList[index], data.data)
							console.log(data.id);
							// $scope.$broadcast('ellipsContent-'+data.id);
						}
			        }else
			        if(data.verb =='destroyed'){
			        	// _.find($scope.projectsList,function(o) { return o.age < 40; });
			        	var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
						if( index !== -1) {
							
							console.log($scope.projectsList[index]);
							$scope.projectsList.splice(index,1)
							// console.log(data.id);
							// $scope.$broadcast('ellipsContent-'+data.id);
						}
			        }else
			        if(data.verb =='addedTo'){
							console.log('addedTO');
							var projectTochange = _.find($scope.projectsList, function(o){ return o.id == data.id})

							if(data.attribute == 'tags'){

								if(projectTochange){
									if(typeof(projectTochange.tags) == 'undefined'){
									projectTochange.tags = [];
									}
								tagService.fetchOne(data.addedId).then(function(tag){
									console.log(tag);
									projectTochange.tags.push(tag)

								},function(d){
									console.log('EROOR');
								})
								}
							}else
							if(data.attribute == 'categories'){

								console.log('categories');
								console.log(data.addedId);
								if(typeof(projectTochange.categories) == 'undefined'){
									projectTochange.categories = [];
								}
								categoryService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									projectTochange.categories.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'images'){

								console.log('images');
								console.log(data.addedId);
								if(typeof(projectTochange.images) == 'undefined'){
									projectTochange.images = [];
								}
								imageService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									projectTochange.images.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'documents'){

								console.log('documents');
								console.log(data.addedId);
								if(typeof(projectTochange.documents) == 'undefined'){
									projectTochange.documents = [];
								}
								documentService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									projectTochange.documents.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'authors'){

								console.log('authors');
								console.log(data.addedId);
								console.log(projectTochange);
								if(typeof(projectTochange.authors) == 'undefined'){
									projectTochange.authors = [];
								}
								userService.fetchOne(data.addedId).then(function(author){
									projectTochange.authors.push(author)

								},function(d){
									console.log('EROOR');
								})
							}

						}else
						if(data.verb =='removedFrom'){
							console.log('removeFrom');
							var projectTochange = _.find($scope.projectsList, function(o){ return o.id == data.id})

							if(data.attribute == 'tags'){
								var index = _.findIndex(projectTochange.tags, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									projectTochange.tags.splice(index,1)
								}
							}
							if(data.attribute == 'categories'){
								var index = _.findIndex(projectTochange.categories, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									projectTochange.categories.splice(index,1)
								}
							}
							if(data.attribute == 'images'){
								var index = _.findIndex(projectTochange.images, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									projectTochange.images.splice(index,1)
								}
							}
							if(data.attribute == 'documents'){
								var index = _.findIndex(projectTochange.documents, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									projectTochange.documents.splice(index,1)
								}
							}
							if(data.attribute == 'authors'){
								var index = _.findIndex(projectTochange.authors, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									projectTochange.authors.splice(index,1)
								}
							}

						}
			    })
				$sailsSocket.subscribe('category',function(data){
			        console.log('ON category');
			        console.log(data);
			        if(data.verb =='created'){

			        	// $scope.projectsList.unshift(data.data)
			        	
			        }else
			        if(data.verb =='updated'){

			        	console.log('updated');
			        	console.log(data.id);
			        	// console.log($scope.projectsList);

			        	for(var i in $scope.projectsList){
			        		console.log($scope.projectsList[i]);

			        		if($scope.projectsList[i].categories.length)
			        		{
			        			var index = _.findIndex($scope.projectsList[i].categories, function(o) { return o.id == data.id; });
								if( index !== -1) {
									console.log(data.data);
									// $scope.projectsList[i].categories.splice(index,1,data.data)
									_.merge($scope.projectsList[i].categories[index], data.data)
								}
			        		}
			        	}
			        	// _.find($scope.projectsList,function(o) { return o.age < 40; });
			   //      	var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							
						// 	console.log($scope.projectsList[index]);
						// 	_.merge($scope.projectsList[index], data.data)
						// 	console.log(data.id);
						// 	// $scope.$broadcast('ellipsContent-'+data.id);
						// }
			        }else
			        if(data.verb =='destroyed'){
			        	// _.find($scope.projectsList,function(o) { return o.age < 40; });
			   //      	var index = _.findIndex($scope.projectsList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							
						// 	console.log($scope.projectsList[index]);
						// 	$scope.projectsList.splice(index,1)
						// 	// console.log(data.id);
						// 	// $scope.$broadcast('ellipsContent-'+data.id);
						// }
			        }
			    })
		}],
		link:function(scope,element,attrs){
			
		}
    };

}]);