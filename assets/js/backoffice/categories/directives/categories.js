angular.module('momi-categories')
  .directive('categories', function(categoryService){

    'use strict';

    return {
      
      	scope: {
      		categoriesList:'=categoriesList',
      	},
		replace: true,
		templateUrl: 'js/backoffice/categories/partials/categories.html',
		controller:function($mdDialog,$scope,$rootScope,categoryService,tagService,imageService,documentService,$sailsSocket,$stateParams,$state,usSpinnerService){
			console.log($scope.categoriesList);

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
				categoryService.update(id,attrToUpdate).then(function(data){
					console.log('----------------------------------------------------------');
					console.log(data);
					// console.log($scope.$parent);
					$rootScope.$broadcast('categorySelfChange',data);

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
					categoryService.fetch($scope.sort,$scope.pagin,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.categoriesList = _.union($scope.categoriesList , data);
						}
						$scope.stopSpin()
					})
				}
			}
			$scope.changeSort=function(type){
				switch(type)
				{
					case 'name':
						if($scope.sort == 'name ASC'){
							$scope.sort =	'name DESC'
						}else{
						 	$scope.sort =	'name ASC'
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
				$state.transitionTo('categories', { sort: $scope.sort,page:$scope.page,nbPerPage:$scope.nbPerPage}, {location:true});
				// console.log('fetchArticles');
				// $scope.fetchArticles()
				
			}	
			
			// $scope.blurOnEnter=function($event,$element) {
			// 	if($event.keyCode == 13){
			// 		$event.currentTarget.blur()	
			// 		return true;
			// 	}
			// 	else
			// 		return false
			// }
			// $scope.searchCategories=function(){

			// 	console.log('$scope.searchSlug');
			// 	console.log($scope.searchSlug);
			// 	if($scope.searchSlug){

			// 		categoryService.searchCategories($scope.searchSlug,$scope.sort).then(function(data){
			// 			console.log(data);
			// 			$scope.categoriesList = data;
			// 		}).catch(function(e){
			// 			console.log('err');
			// 			console.log(e);
			// 		})
			// 	}else{
			// 		categoryService.fetch($scope.sort,0,10).then(function(data){
			// 			console.log(data);
			// 			if(data.length==0)
			// 			{
			// 				$scope.fin = true
			// 			}else{
			// 				$scope.categoriesList = data;
			// 			}
			// 			$scope.stopSpin()
			// 		})
			// 	}
			// }
			$scope.blurSearch = 0;
			$scope.searchCategories=function(){
				console.log('searchCategories');
				if($scope.searchSlug){
					if($scope.blurSearch== 0){
						console.log('$scope.searchSlug');
						console.log($scope.searchSlug);
						categoryService.searchCategories($scope.searchSlug,$scope.sort).then(function(data){
							console.log(data);
							$scope.categoriesList = data;
						}).catch(function(e){
							console.log('err');
							console.log(e);
						})
					}else if($scope.blurSearch== 1){
						console.log('$scope.searchSlug');
						console.log($scope.searchSlug);
						categoryService.searchCategories($scope.searchSlug,$scope.sort).then(function(data){
							console.log(data);
							$scope.categoriesList = data;
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
					categoryService.fetch($scope.sort,0,10).then(function(data){
						console.log(data);
						if(data.length==0)
						{
							$scope.fin = true
						}else{
							$scope.categoriesList = data;
						}
						$scope.stopSpin()
					})
				}
				
			}
		
			$scope.blurOnEnter=function($event,$element) {
				if($event.keyCode == 13){
					console.log('ON ENTER');
					$scope.blurSearch = 1;	
					$scope.searchCategories();
				}else{
					$scope.blurSearch = 0;
				}
				
			}
			// $rootScope.$on('categorySelfChangeImg',function(e,data){
			// 	console.log('categorySelfChangeImg');
			// 	console.log(data);
			// 	console.log($scope.categoryList);
			// 		var index = _.findIndex($scope.categoryList, function(o) { return o.id == data.id; });
			// 		if( index !== -1) {
			// 			$scope.categoryList[index].images = data.images;
			// 			$scope.$applyAsync()
			// 		}
			// })
			$scope.reloadsFirstImg =function(id,filename){
				console.log($scope.categoriesList);

				var tmpfilename =filename + '?rdm='+Math.round(Math.random() * 999999);
				for(var i in $scope.categoriesList)
				{
					if($scope.categoriesList[i].images.length){
						
						var index = _.findIndex($scope.categoriesList[i].images, function(o) { return o.id == id; });
						if( index !== -1) {
							$scope.categoriesList[i].images[index].filename= tmpfilename;
							
								
						}
						// $scope.categoriesList[0].filename
						// for(var j in $scope.categoriesList.images)
					}
				}
			}
			// $rootScope.$on('categorySelfChangeImg2',function(e,cat){
			// 	console.log('categorySelfChangeImg2');
			// 	console.log(cat);
					
			// 		// console.log($scope.categoryList);

				

			// 			console.log('hehe');
			// 			var tmp = cat.images[0].fileName;
			// 			cat.images[0].fileName = '';
			// 			cat.images[0].fileName= tmp;
			// 		$scope.$applyAsync()

			// })
			$scope.ModalImage=function(Cat){
				
				// $scope.showAdvanced = function(ev) {
				// console.log('showadvan');

			    // var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller: function($scope,$rootScope,categoryService, Upload,$timeout){
			      	
			      	console.log(Cat.id);
			      	$scope.Cat = Cat;
			      	$scope.indexImage=0;
        			$scope.uploadingImages=[];

			      	$scope.imgcrop = {};
				    $scope.imgcrop.imgEditId = 0;
					$scope.imgcrop.displayHeight = 0;
					$scope.imgcrop.displayWidth = 0;
					$scope.imgcrop.scaledWidth = 0;
					$scope.imgcrop.scaledHeight = 0;
					$scope.imgcrop.scaledTop = 0;
					$scope.imgcrop.scaledLeft = 0;
					$scope.imgcrop.containerWidth = 0;
					$scope.imgcrop.containerHeight = 0;
					$scope.imgcrop.aspectRatio = '4/1';
					$scope.imgcrop.imgSrc = "";
					$scope.imgcrop.aspectRatioPaysage = '4/1';
					$scope.imgcrop.aspectRatioPortrait = '4/1';


					$scope.removeImg=function(img){
						$rootScope.startSpin();
						categoryService.removeImage(Cat.id,img).then(function(data){
							var index = _.findIndex($scope.Cat.images, function(o) { return o.id == img; });
							if( index !== -1) {
								$scope.Cat.images.splice(index, 1);
							}
							//  else {
							// 	$scope.formData.tags.push(tag_with_id);
							// }
							$rootScope.$broadcast('categorySelfChangeImg',data);
							$rootScope.stopSpin();
						},function(d){
							console.log('EROOR');
						})
					}

			      	$scope.addImgCrop=function($files){
						console.log('uploadFiles');
							
						console.log($files);
						// $scope.imgcrop = {};
						$scope.imgcrop.imgEditId = 0;
						$scope.imgcrop.displayHeight = 0;
						$scope.imgcrop.displayWidth = 0;
						$scope.imgcrop.scaledWidth = 0;
						$scope.imgcrop.scaledHeight = 0;
						$scope.imgcrop.scaledTop = 0;
						$scope.imgcrop.containerWidth = 0;
						$scope.imgcrop.containerHeight = 0;
						$scope.imgcrop.scaledLeft = 0;
						$scope.imgcrop.imgSrc = '';
						$('#imageCropSelector').css({'display':'none'})
						// $files[0].$ngfBlobUrl;

						if(typeof($files[0])== 'object'){
							$scope.imgcrop.imgSrc = $files[0].$ngfBlobUrl;
							$('#imageCropSource').show();

							$scope.imgcrop.file = $files[0];
							$scope.$applyAsync();
						    if($files[0].$ngfWidth < $files[0].$ngfHeight)
			            	{
			            		$scope.imgcrop.aspectRatio = $scope.imgcrop.aspectRatioPortrait;
			            		$scope.imgcrop.landscape = false;
			            	}else{
			            		$scope.imgcrop.aspectRatio = $scope.imgcrop.aspectRatioPaysage;
			            		$scope.imgcrop.landscape = true;
			            	}
						}

					};
					$scope.uploadImage = function () {

		        		console.log($scope.imgcrop);
		        		console.log('UPLOAD IMAGE');
				        $scope.dataToSend = {};
				        $scope.fileToSend = $scope.imgcrop.file; 
				        $scope.dataToSend.file = $scope.imgcrop.file; 
				        $scope.dataToSend.displayHeight = $scope.imgcrop.displayHeight;
				        $scope.dataToSend.displayWidth = $scope.imgcrop.displayWidth;
				        $scope.dataToSend.scaledWidth = $scope.imgcrop.scaledWidth;
				        $scope.dataToSend.scaledHeight = $scope.imgcrop.scaledHeight;
				        $scope.dataToSend.scaledTop = $scope.imgcrop.scaledTop;
				        $scope.dataToSend.scaledLeft = $scope.imgcrop.scaledLeft;
				        $scope.dataToSend.aspectRatio = $scope.imgcrop.aspectRatio;
				        $scope.dataToSend.landscape = $scope.imgcrop.landscape;
				        $scope.dataToSend.containerWidth = $scope.imgcrop.containerWidth;
				        $scope.dataToSend.containerHeight = $scope.imgcrop.containerHeight;
				        $scope.uploadingImages[$scope.indexImage] = {};
				        $scope.uploadingImages[$scope.indexImage].status = 'start';
				        $scope.uploadingImages[$scope.indexImage].text='0%';
				        $scope.uploadingImages[$scope.indexImage].file=$scope.imgcrop.file;

		                $scope.uploadingImages[$scope.indexImage].status='progress';
		                (function(indexImage){
		                	$scope.imgcrop.imgEditId = 0;
		                	$scope.imgcrop.displayHeight = 0;
							$scope.imgcrop.displayWidth = 0;
							$scope.imgcrop.scaledWidth = 0;
							$scope.imgcrop.scaledHeight = 0;
							$scope.imgcrop.scaledTop = 0;
							$scope.imgcrop.scaledLeft = 0;
							$scope.imgcrop.containerWidth = 0;
							$scope.imgcrop.containerHeight = 0;
							$scope.imgcrop.aspectRatio = '4/1';
							$scope.imgcrop.imgSrc = "";
							$('#imageCropSource').hide();

		                    Upload.upload({
		                        url: '/api/category/'+Cat.id+'/images',
		                        data: {file :$scope.fileToSend}
		                      
		                        
		                    }).then(function (data) {
		                    	console.log(data);
		           //          	console.log(data.data.child);
		                    	// $rootScope.$broadcast('categorySelfChangeImg',data.data.parent);
		                    	// $scope.Cat.images.push(data.data.child)
		                    	$scope.dataToSend.imgid= data.data.child.id;
		                    	$scope.dataToSend.filename= data.data.child.filename;
		                    	$rootScope.startSpin();
		      					$sailsSocket.post('/api/image/resize/',$scope.dataToSend).success(function (data,status) {
						            console.log('SUCCESS RESIZE ! !');

						           

						            $rootScope.stopSpin();
						          
						        }).error(function (data,status) {
						            console.log(data);
						            console.log('errOR');
						        })


		                        $scope.uploadingImages[indexImage].text='Envoi terminé';
		                        (function(indexImage){

		                            $timeout(function () {
		                                $scope.uploadingImages[indexImage].status = 'success';
		                            },2000)
		                        })(indexImage)
		                        
		                        // $mdDialog.hide()

		                    },function (evt) {
		                    	console.log('BIG');
		                        //HANDLE ERROR
		                    },function (evt) {
		                        $scope.uploadingImages[indexImage].progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		                        $scope.uploadingImages[indexImage].text = $scope.uploadingImages[indexImage].progressPercentage+'%'
		                    });
		                })($scope.indexImage)
				        $scope.indexImage++;
				    };

				    $scope.resizeOnly=function(){
		        		$rootScope.startSpin();
						$scope.dataToSend = {};
				        $scope.dataToSend.displayHeight = $scope.imgcrop.displayHeight;
				        $scope.dataToSend.displayWidth = $scope.imgcrop.displayWidth;
				        $scope.dataToSend.scaledWidth = $scope.imgcrop.scaledWidth;
				        $scope.dataToSend.scaledHeight = $scope.imgcrop.scaledHeight;
				        $scope.dataToSend.scaledTop = $scope.imgcrop.scaledTop;
				        $scope.dataToSend.scaledLeft = $scope.imgcrop.scaledLeft;
				        $scope.dataToSend.aspectRatio = $scope.imgcrop.aspectRatio;
				        $scope.dataToSend.landscape = $scope.imgcrop.landscape;
				        $scope.dataToSend.containerWidth = $scope.imgcrop.containerWidth;
				        $scope.dataToSend.containerHeight = $scope.imgcrop.containerHeight;


				        console.log('-<->-<-<-<-<-<-<-<-<-<6-<-<-<-<-<-<-<--<');
				        console.log($scope.imgcrop.filename);
				        console.log($scope.imgcrop.filename.lastIndexOf('?'));

				        if($scope.imgcrop.filename.lastIndexOf('?') != -1)
				        {
				        	$scope.dataToSend.filename = $scope.imgcrop.filename.substring(0,$scope.imgcrop.filename.lastIndexOf('?'))
				        }else{
					        $scope.dataToSend.filename= $scope.imgcrop.filename;
				        }
				        console.log($scope.dataToSend.filename);

				        $scope.dataToSend.imageId= $scope.imgcrop.imgEditId;
						$('#imageCropSource').hide();

				        $scope.imgcrop.imgEditId = 0;
		            	$scope.imgcrop.displayHeight = 0;
						$scope.imgcrop.displayWidth = 0;
						$scope.imgcrop.scaledWidth = 0;
						$scope.imgcrop.scaledHeight = 0;
						$scope.imgcrop.scaledTop = 0;
						$scope.imgcrop.scaledLeft = 0;
						$scope.imgcrop.containerWidth = 0;
						$scope.imgcrop.containerHeight = 0;
						$scope.imgcrop.aspectRatio = '16/9';
						$scope.imgcrop.imgSrc = "";

				        $sailsSocket.post('/api/image/resize/',$scope.dataToSend).success(function (data,status) {
				            console.log('SUCCESS RESIZE______');
				     //         var tmp = $scope.Cat.images[0]
				     //         console.log(tmp);
				     //         console.log($scope.Cat.images);
				     //         $scope.Cat.images.splice(0,1)
				     //         console.log($scope.Cat.images);
									// // $scope.Cat.images=[];
									// $scope.Cat.images.push(tmp);
				     //         console.log($scope.Cat.images);
				     //         $scope.$applyAsync()
				            $rootScope.stopSpin();
				            
				        }).error(function (data,status) {
				            console.log(data);
				            console.log('errOR');
				        })
			        }

		        	
				    $scope.resizeagain=function(img){
				    	console.log(img);

				    	$scope.imgcrop.imgSrc = 'image/originalSize/'+img.filename;
				    	$scope.imgcrop.imgEditId = img.id;
				    	$scope.imgcrop.filename = img.filename;
						
				    }
				    

					// $scope.uploadDocument=function($files){
					// 	console.log('fileDrop');
					// 	console.log($files);



					// };
					$scope.removeImgCrop = function(){
						console.log('CANCEL IMAGE');
						setTimeout(function(){
							// $('#imageCropSource').attr('src','');
							$('#imageCropSource').hide();
							$scope.imgcrop.imgSrc = '';
							$scope.$applyAsync();
							console.log($('.md-dialog-container md-dialog-content'));
							$('.md-dialog-container md-dialog-content').css('overflow','hidden');
							setTimeout(function(){
								$('.md-dialog-container md-dialog-content').css('overflow','auto');
							},1)
						},1)
						// $scope.$applyAsync();
					}


			      // },
			     },
			      templateUrl: 'js/backoffice/categories/partials/dialogImgCat.html',
			      parent: angular.element(document.body),
			      // targetEvent: ev,
			      clickOutsideToClose:true,
			    })
			    .then(function(answer) {
			      $scope.status = 'You said the information was "' + answer + '".';
			    }, function() {
			      $scope.status = 'You cancelled the dialog.';
			    });
			    
			// };



			}
			

			
				
			


			    $sailsSocket.subscribe('category',function(data){
			        console.log('ON CATEGORY');
			        console.log(data);
			        if(data.verb =='created'){

			        	$scope.categoriesList.unshift(data.data)
			        	
			        }else
			        if(data.verb =='updated'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			        	var index = _.findIndex($scope.categoriesList, function(o) { return o.id == data.id; });
						if( index !== -1) {
							
							console.log($scope.categoriesList[index]);
							_.merge($scope.categoriesList[index], data.data)
							console.log(data.id);
							// $scope.$broadcast('ellipsContent-'+data.id);
						}
			        }else
			        if(data.verb =='destroyed'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			        	var index = _.findIndex($scope.categoriesList, function(o) { return o.id == data.id; });
						if( index !== -1) {
							
							console.log($scope.categoriesList[index]);
							$scope.categoriesList.splice(index,1)
							// console.log(data.id);
							// $scope.$broadcast('ellipsContent-'+data.id);
						}
			        }
			        else
			        if(data.verb =='addedTo'){
							console.log('addedTO');
							var categoryTochange = _.find($scope.categoriesList, function(o){ return o.id == data.id})
							console.log(categoryTochange);
							
						if(data.attribute == 'images'){

							console.log('images');
							console.log(data.addedId);
							imageService.fetchOne(data.addedId).then(function(img){
								console.log(img);
								// setTimeout(function(){
									categoryTochange.images.push(img)
									
								// },500)

							},function(d){
								console.log('EROOR');
							})
						}
							
						}else
						if(data.verb =='removedFrom'){
							console.log('removeFrom');
							var categoryTochange = _.find($scope.categoriesList, function(o){ return o.id == data.id})

							
							if(data.attribute == 'images'){
								var index = _.findIndex(categoryTochange.images, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									categoryTochange.images.splice(index,1)
								}
							}
							

						}
			    })
				$sailsSocket.subscribe('image',function(data){
			        console.log('ON category');
			        console.log(data);
			        
			        if(data.verb =='updated'){

			        	console.log('updated');
			        	console.log(data.id);
			        	// console.log($scope.articlesList);

			        	
	     //    			var index = _.findIndex($scope.formData.categories, function(o) { return o.id == data.id; });
						// if( index !== -1) {
						// 	console.log(data.data);
						// 	// $scope.articlesList[i].categories.splice(index,1,data.data)
						// 	_.merge($scope.formData.categories[index], data.data)
						// }
			        	$scope.reloadsFirstImg(data.id,data.data.filename);
			        
			        }
				       
				})
		},
		link:function(scope,element,attrs){
			
		}
    };

});