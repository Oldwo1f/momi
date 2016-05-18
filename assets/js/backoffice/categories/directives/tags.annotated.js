angular.module('momi-categories')
  .directive('tags', ["tagService", function(tagService){

    'use strict';

    return {
      
      	scope: {
      		tagsList:'=tagsList',
      	},
		replace: true,
		templateUrl: 'js/backoffice/categories/partials/tags.html',
		controller:["$mdDialog", "$scope", "$rootScope", "tagService", "imageService", "documentService", "$sailsSocket", "$stateParams", "$state", "usSpinnerService", function($mdDialog,$scope,$rootScope,tagService,imageService,documentService,$sailsSocket,$stateParams,$state,usSpinnerService){
			console.log($scope.tagsList);

			$scope.returnParentState=function(){
				// console.log('returnParentState BLOG');
				$state.go('^')
			}
			$scope.returnDashboardState=function(){
				// console.log('returnDashboardState BLOG');
				$state.go('dashboard')
			}
			$scope.returnPreviousState=function(){
				if($rootScope.previousState){
					$state.go($rootScope.previousState.name, $rootScope.previousStateParams)
				}else{
					$state.go('^')
				}
			}


			$scope.miniColorsSetting={
				  theme: 'bootstrap',
				  position: 'bottom left',
				  defaultValue: '',
				  animationSpeed: 50,
				  animationEasing: 'swing',
				  change: null,
				  changeDelay: 0,
				  control: 'hue',
				  hide: false,
				  hideSpeed: 100,
				  // inline: true,
				  letterCase: 'lowercase',
				  opacity: false,
				  show: false,
				  showSpeed: 100
			}


			$scope.update=function(id,attribute,value){
				$rootScope.startSpin();
				var attrToUpdate = {};
				attrToUpdate[attribute] = value;
				console.log(attrToUpdate);
				tagService.update(id,attrToUpdate).then(function(data){
					console.log('----------------------------------------------------------');
					console.log(data);

					 	var index = _.findIndex($scope.tagsCloudtag, function(o) { return o.myid == data.id; });
	                    console.log(index);
	                    if( index !== -1) {

	                        var dataUsable = {};
	                        if(data.text)
	                            dataUsable.text = data.text
	                        if(data.id)
	                            dataUsable.myid = data.id
	                        dataUsable.html = {};
	                        if(data.total){
	                            dataUsable.weight = data.total
	                            dataUsable.html.title = data.total
	                        }
	                        
	                        dataUsable.html.class = 'CatInCloud'
	                        console.log(dataUsable);
	                        _.merge($scope.tagsCloudtag[index], dataUsable)
	                        $('#cloudTags').jQCloud('update', $scope.tagsCloudtag);

	                    }


					// console.log($scope.$parent);
					$rootScope.$broadcast('tagSelfChange',data);

        			$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}
			$scope.changeColor=function(color, id){
				$scope.update(id,'color',color);
				return;
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



			// $scope.fetchArticles=function(){
			// 	console.log('fetchArticles');
			// 	articleService.fetch($scope.sort,$scope.page,$scope.nbPerPage).then(function(data){
			// 		$scope.articlesList = data;
			// 	})
			// }
			$scope.pagin=1;
			$scope.myPagingFunction=function(){
				if(!$scope.searchSlug){
					$scope.startSpin();
					$scope.pagin++;
					console.log('myPagingFunction');
					tagService.fetch($scope.sort,$scope.pagin,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.tagsList = _.union($scope.tagsList , data);
						}
						$scope.stopSpin()
					})
				}
			}
			$scope.changeSort=function(type){
				switch(type)
				{
					case 'text':
						if($scope.sort == 'text ASC'){
							$scope.sort =	'text DESC'
						}else{
						 	$scope.sort =	'text ASC'
						}
					break;
					case 'nbArticles':
						if($scope.sort == 'nbArticles DESC'){
							$scope.sort =	'nbArticles ASC'
						}else{
						 	$scope.sort =	'nbArticles DESC'
						}
					break;
					case 'nbProjects':
						if($scope.sort == 'nbProjects DESC'){
							$scope.sort =	'nbProjects ASC'
						}else{
						 	$scope.sort =	'nbProjects DESC'
						}
					break;
				}
				// $stateParams.sort = $scope.sort;
				console.log($scope.sort);
				$state.transitionTo('tags', { sort: $scope.sort,page:$scope.page,nbPerPage:$scope.nbPerPage}, {location:true});
				// console.log('fetchArticles');
				// $scope.fetchArticles()
				
			}	
			$scope.cloudTagsOpts = {
	            steps: 10,
	            autoResize:true,
	            delay:100,
	            
	            // colors:['#00CCFF','#03C3FE','#06BAFD','#09B1FD','#0CA8FC','#0FA0FC','#1297FB','#158EFB','#1885FA','#1C7DFA'],
	            // removeOverflowing:false,
	            afterCloudRender:function(){
	                console.log('afterCloudRender2');
	                $('.TagInCloud').hover(function(){
	                	$('.tableRowTag[rel="'+$(this).attr('rel')+'"]').addClass('hovered')
		            },function(){
	                	$('.tableRowTag[rel="'+$(this).attr('rel')+'"]').removeClass('hovered')

		            })
	            }
	        }


			$scope.blurSearch = 0;
			$scope.searchTags=function(){
				console.log('searchTags');
				if($scope.searchSlug){
					if($scope.blurSearch== 0){
						console.log('$scope.searchSlug');
						console.log($scope.searchSlug);
						tagService.searchTags($scope.searchSlug,$scope.sort).then(function(data){
							console.log(data);
							$scope.tagsList = data;
						}).catch(function(e){
							console.log('err');
							console.log(e);
						})
					}else if($scope.blurSearch== 1){
						console.log('$scope.searchSlug');
						console.log($scope.searchSlug);
						tagService.searchTags($scope.searchSlug,$scope.sort).then(function(data){
							console.log(data);
							$scope.tagsList = data;
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
					tagService.fetch($scope.sort,0,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.tagsList = data;
						}
						$scope.stopSpin()
					})
				}
				
			}
		
			$scope.blurOnEnter=function($event,$element) {
				if($event.keyCode == 13){
					console.log('ON ENTER');
					$scope.blurSearch = 1;	
					$scope.searchTags();
				}else{
					$scope.blurSearch = 0;
				}
				
			}
			// $rootScope.$on('tagSelfChangeImg',function(e,data){
			// 	console.log('tagSelfChangeImg');
			// 	console.log(data);
			// 	console.log($scope.tagList);
			// 		var index = _.findIndex($scope.tagList, function(o) { return o.id == data.id; });
			// 		if( index !== -1) {
			// 			$scope.tagList[index].images = data.images;
			// 			$scope.$applyAsync()
			// 		}
			// })
			

			
				
			


			    $sailsSocket.subscribe('tag',function(data){
			        console.log('ON tag');
			        console.log(data);
			        if(data.verb =='created'){

			        	$scope.tagsList.unshift(data.data)
			        	data = data.data
			        	 var dataUsable = {};
                        dataUsable.text = data.text
                        dataUsable.myid = data.id
                        dataUsable.html = {};
                        dataUsable.weight = data.total
                        dataUsable.html.title = data.total
                        dataUsable.html.class = 'CatInCloud'
                    
                    	$scope.tagsCloudtag.push(dataUsable)
                    	$('#cloudTags').jQCloud('update', $scope.tagsCloudtag);


			        	
			        }else
			        if(data.verb =='updated'){
			        	 var index = _.findIndex($scope.tagsCloudtag, function(o) { return o.myid == data.id; });
	                    console.log(index);
	                    if( index !== -1) {

	                        var dataUsable = {};
	                        if(data.data.text)
	                            dataUsable.text = data.data.text
	                        if(data.data.id)
	                            dataUsable.myid = data.data.id
	                        dataUsable.html = {};
	                        if(data.data.total){
	                            dataUsable.weight = data.data.total
	                            dataUsable.html.title = data.data.total
	                        }
	                        
	                        dataUsable.html.class = 'CatInCloud'
	                        console.log(dataUsable);
	                        _.merge($scope.tagsCloudtag[index], dataUsable)
	                        $('#cloudTags').jQCloud('update', $scope.tagsCloudtag);

	                    }
			        }else
			        if(data.verb =='destroyed'){
			        	var index = _.findIndex($scope.tagsCloudtag, function(o) { return o.myid == data.id; });
	                    if( index !== -1) {
	                        
	                        $scope.tagsCloudtag.splice(index,1)
	                    }    
                    	$('#cloudTags').jQCloud('update', $scope.tagsCloudtag);
			        }
			       
			    })
				
		}],
		link:function(scope,element,attrs){

			tagService.fetchAll().then(function(data){

	            console.log(data);
	           data = _.map(data,function(c){

	            return {'text':c.text,'myid':c.id,'weight':c.total,
	                html:{
	                  'title': c.total,
	                  'class': 'TagInCloud',
	                  'rel': c.id
	                }
	            }
	            
	          })

	          
	            scope.tagsCloudtag =data


	            $('#cloudTags').height($('#cloudTags').parent('.tag_col_right').height())
	            $('#cloudTags').width($('#cloudTags').parent('.tag_col_right').width())
	            $('#cloudTags').jQCloud(scope.tagsCloudtag, scope.cloudTagsOpts);

	            
	          // scope.$applyAsync()
	        }).catch(function(e){
	          console.log(e);
	        })

		}
    };

}]);