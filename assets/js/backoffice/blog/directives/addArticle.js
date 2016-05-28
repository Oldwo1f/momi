angular.module('momi-blog')
.directive('addArticle', function(){

    'use strict';

    return {
      	scope: {
      		newArticle:'=',
      	},
      	replace: true,
      	templateUrl: 'js/backoffice/blog/partials/addArticle.html',
      	controller:function($state,$timeout,$scope,userService,$rootScope,articleService,$mdToast,imageService,documentService, tagService, categoryService, $q, Upload,$sailsSocket){

      		$scope.touched = false;
      		console.log($state);
      		console.log($state.current.name);
      		if($state.current.name == 'blog.edit'){
      			$scope.touched = true;
      		}
      		$rootScope.$on('$stateChangeStart',function (e,toState,toParams,fromState,fromParams){


      			console.log('STATE CHANGE START');
      			console.log($scope.touched);
      			console.log($scope.formData.id);
      			if($scope.touched == false){
	      			articleService.remove($scope.formData.id).then(function(data){
						console.log('----------------------------------------------------------');
						$rootScope.$broadcast('articleSelfRemove',data.id);
						
	            		// $state.go('^')

	        			$rootScope.stopSpin();
					},function(d){
						console.log('EROOR'); 
					})
      			}
		          

		   });
      		$scope.returnParentState=function(){
				$state.go('^')
			}
			$scope.returnPreviousState=function(){
				if($rootScope.previousState){
					$state.go($rootScope.previousState.name, $rootScope.previousStateParams)
				}else{
					$state.go('^')
				}
			}
			$scope.returnDashboardState=function(){
				$state.go('dashboard')
			}
      		
			$scope.selectedItem = null;
    		$scope.searchText = null;
    		
      		$scope.NewImage='';

      		console.log($scope.newArticle);
			$scope.formData=$scope.newArticle;
			if($state.current.name != 'blog.edit'){
      			// $scope.touched = true;
				$rootScope.$broadcast('articleSelfAdd',$scope.newArticle);
      		}

			$sailsSocket.subscribe('article',function(data){
			        console.log('ON ARTICLE2');
			        console.log(data);
			        if(data.id == $scope.newArticle.id)
			        {
			        	console.log('cool');
			        	if(data.verb =='created'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			        	// var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							console.log('created');
							// console.log($scope.articlesList[index]);
							// _.merge($scope.formData, data.data)

						}else
						if(data.verb =='updated'){
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			        	// var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							console.log('MERGE');
							// console.log($scope.articlesList[index]);
							_.merge($scope.formData, data.data)

						}else
						if(data.verb =='destroyed'){
			        	$state.go('^')

						}else
						if(data.verb =='addedTo'){
							console.log('addedTO');
							if(data.attribute == 'tags'){

								console.log('TAGS');
								console.log(data.addedId);
								tagService.fetchOne(data.addedId).then(function(tag){
									console.log(tag);
									$scope.formData.tags.push(tag)

								},function(d){
									console.log('EROOR');
								})
							}else
							if(data.attribute == 'categories'){

								console.log('categories');
								console.log(data.addedId);
								categoryService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									$scope.formData.categories.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'images'){

								console.log('images');
								console.log(data.addedId);
								imageService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									$scope.formData.images.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'documents'){

								console.log('documents');
								console.log(data.addedId);
								documentService.fetchOne(data.addedId).then(function(cat){
									console.log(cat);
									$scope.formData.documents.push(cat)

								},function(d){
									console.log('EROOR');
								})
							}
							if(data.attribute == 'authors'){

								console.log('authors');
								console.log(data.addedId);
								userService.fetchOne(data.addedId).then(function(user){
									console.log(user);
									$scope.formData.authors.push(user)

								},function(d){
									console.log('EROOR');
								})
							}

						}else
						if(data.verb =='removedFrom'){
							console.log('removeFrom');
							if(data.attribute == 'tags'){
								var index = _.findIndex($scope.formData.tags, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									$scope.formData.tags.splice(index,1)
								}
							}
							if(data.attribute == 'categories'){
								var index = _.findIndex($scope.formData.categories, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									$scope.formData.categories.splice(index,1)
								}
							}
							if(data.attribute == 'images'){
								var index = _.findIndex($scope.formData.images, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									$scope.formData.images.splice(index,1)
								}
							}
							if(data.attribute == 'documents'){
								var index = _.findIndex($scope.formData.documents, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									$scope.formData.documents.splice(index,1)
								}
							}
							if(data.attribute == 'authors'){
								var index = _.findIndex($scope.formData.authors, function(o) { return o.id == data.removedId; });
								if( index !== -1) {
									$scope.formData.authors.splice(index,1)
								}
							}

						}
			        }else{
			        	console.log('PAS bon ID');
			        }
			   //      if(data.verb =='created'){

			   //      	$scope.articlesList.unshift(data.data)
			        	
			   //      }else
			   //      if(data.verb =='updated'){
			   //      	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			   //      	var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							
						// 	console.log($scope.articlesList[index]);
						// 	_.merge($scope.articlesList[index], data.data)

						// }
			   //      }
			    })
			$sailsSocket.subscribe('category',function(data){
			        console.log('ON category');
			        console.log(data);
			        
			        if(data.verb =='updated'){

			        	console.log('updated');
			        	console.log(data.id);
			        	// console.log($scope.articlesList);

			        	
	        			var index = _.findIndex($scope.formData.categories, function(o) { return o.id == data.id; });
						if( index !== -1) {
							console.log(data.data);
							// $scope.articlesList[i].categories.splice(index,1,data.data)
							_.merge($scope.formData.categories[index], data.data)
						}
			        	
			        	// _.find($scope.articlesList,function(o) { return o.age < 40; });
			   //      	var index = _.findIndex($scope.articlesList, function(o) { return o.id == data.id; });
						// if( index !== -1) {
							
						// 	console.log($scope.articlesList[index]);
						// 	_.merge($scope.articlesList[index], data.data)
						// 	console.log(data.id);
						// 	// $scope.$broadcast('ellipsContent-'+data.id);
						// }
			        }
			       
			})

			$scope.closeDatePicker=function(t,tt){
				$('.open').removeClass('open')
			}
			$scope.update=function(attribute){

				$rootScope.startSpin();
				var attrToUpdate = {};
				attrToUpdate[attribute] = $scope.formData[attribute];
				articleService.update($scope.formData.id,attrToUpdate).then(function(data){
					console.log('----------------------------------------------------------');
					console.log(data);
					console.log($scope.$parent);
					$scope.touched = true;
					$rootScope.$broadcast('articleSelfChange',data);

        			$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}
			$scope.removeThis=function(id){
				$rootScope.startSpin();
				// var attrToUpdate = {};
				// attrToUpdate[attribute] = $scope.formData[attribute];
				articleService.remove($scope.formData.id).then(function(data){
					console.log('----------------------------------------------------------');
					console.log(data);
					console.log(id);
					$rootScope.$broadcast('articleSelfRemove',id);
					
            		$state.go('^')

				// 	console.log(data);
				// 	console.log($scope.$parent);
				// 	$rootScope.$broadcast('articleSelfChange',data);

        			$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}

		    $scope.autocompleteTag =function(query) {
		    	console.log('autocompleteTag');
		    	return tagService.searchTags(query)
		    }
		    $scope.autocompleteCategories =function(query) {
		    	return categoryService.searchCategories(query)
		    }
		    $scope.autocompleteAuthors =function(query) {
		    	return userService.searchUsers(query)
		    }
		   

		    $scope.unselectOnBlur=function(){
		    	console.log('onBlur');
		    	$('.tag-item.selected').removeClass('selected')
		    }
			$scope.addTag=function(newTag){
				console.log(newTag);
				$rootScope.startSpin();
				var tagText = newTag.text;
				articleService.addTag($scope.formData.id,newTag).then(function(data){
					$rootScope.$broadcast('articleSelfChangeTag',data.parent);
					var tag_with_id =data.child
					var index = _.findIndex($scope.formData.tags, function(o) { return o.text == tagText; });
					if( index !== -1) {
						$scope.formData.tags.splice(index, 1, tag_with_id);
					} else {
						$scope.formData.tags.push(tag_with_id);
					}
					$scope.touched = true;

				$rootScope.stopSpin();
				},function(d){
					console.log(d);
					console.log('EROOR');
				})
			}	
			function transformTag(newTag){
				if (newTag.id){
					return newTag
				}else{
					return {
				    	text: newTag,
					};
				}
			}	

			$scope.removeTag=function(t){
				$rootScope.startSpin();
				articleService.removeTag($scope.formData.id,t).then(function(data){
					console.log(data);
					$rootScope.$broadcast('articleSelfChangeTag',data);
					$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}
			$scope.addCategory=function(newCategory){
				var name = newCategory.name;
				$rootScope.startSpin();
				if(!newCategory.id)
				{
					newCategory={};
					newCategory.name = name;
					newCategory.color = 'darkgrey';
					newCategory.textColor = 'white';
				}
				console.log(newCategory);
				articleService.addCategory($scope.formData.id,newCategory).then(function(data){
					$rootScope.$broadcast('articleSelfChangeCat',data.parent);

					console.log(data);
					var tag_with_id =data.child;
					var index = _.findIndex($scope.formData.categories, function(o) { return o.name == name || o.text == name; });
					
					console.log('index='+index);
					if( index != -1) {
						console.log('index different -1');
						$scope.formData.categories.splice(index, 1, tag_with_id);
					} else {
						console.log('---------------------------------------------------------');
						console.log(tag_with_id);
						$scope.formData.categories.push(tag_with_id);


					}
					$scope.touched = true;

					$rootScope.stopSpin();
						
				},function(d){
					console.log(d);
					console.log('EROOR');
				})
			}	
			function transformCategory(newCategory){

				console.log('transformCategory');
				if (newCategory.id){
					return newCategory
				}else{
					return {
				    	name: newCategory,
				    	color : 'darkgrey',
						textColor : 'white'
					};
				}
			}	

			$scope.removeCategory=function(category){
				$rootScope.startSpin();
				articleService.removeCategory($scope.formData.id,category).then(function(data){
					$rootScope.$broadcast('articleSelfChangeCat',data);
					$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}	

			$scope.addAuthor=function(newAuthor){
				var name = newAuthor.name;
				$rootScope.startSpin();
				if(!newAuthor.id)
				{
					newAuthor={};
					newAuthor.name = name;
					newAuthor.color = 'darkgrey';
					newAuthor.textColor = 'white';
				}
				// console.log(newAuthor);
				articleService.addAuthor($scope.formData.id,newAuthor).then(function(data){
					$rootScope.$broadcast('articleSelfChangeAuthorAdd',data);
					// data = data.data;
					// console.log('ttttttttttttttttttttttttttttttttttttttttt');
					// console.log(data);
					// var tag_with_id =data.child;
					// var index = _.findIndex($scope.formData.authors, function(o) { return o.name == name || o.text == name; });
					
					// // console.log('index='+index);
					// if( index != -1) {
					// 	// console.log('index different -1');
					// 	$scope.formData.authors.splice(index, 1, tag_with_id);
					// } else {
					// 	// console.log('---------------------------------------------------------');
					// 	// console.log(tag_with_id);
					// 	$scope.formData.authors.push(tag_with_id);


					// }
					$scope.touched = true;

					$rootScope.stopSpin();
						
				},function(d){
					console.log('EROOR');
				})
			}	
			function transformAuthor(newAuthor){

				console.log('transformAuthor');
				if (newAuthor.id){
					return newAuthor
				}else{
					return {
				    	name: newAuthor,
					};
				}
			}	

			$scope.removeAuthor=function(author){
				$rootScope.startSpin();
				articleService.removeAuthor($scope.formData.id,author).then(function(data){
					$rootScope.$broadcast('articleSelfChangeAuthorRemove',data);
					$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}	

			$scope.changeVideoHost = function(host){
				console.log('changeVideoHost  '+ host);
				$scope.formData.videoHost = host;
			}
			function tinymce_focus(){
				console.log('FOCUS');
		        $('.mce-edit-area').addClass('focused');
		    }

		    function tinymce_blur(){
		        $('.mce-edit-area').removeClass('focused');
		    	console.log('BLUR');
		    }

      		$scope.tinymceOption ={
      			// skin: 'myStyle',
      			content_css : '/styles/tinymce.css' ,
      			setup: function(editor) {

  					var placeholder = $('#' + editor.id).attr('placeholder');
				    if (typeof placeholder !== 'undefined' && placeholder !== false) {
				      var is_default = false;
				      editor.on('init', function() {
				        // get the current content
				        var cont = editor.getContent();
				        $(editor.getDoc()).contents().find('body').focus(function(){tinymce_focus();});
                    	$(editor.getDoc()).contents().find('body').blur(function(){tinymce_blur();});
				        // If its empty and we have a placeholder set the value
				        if (cont.length === 0) {
				          editor.setContent(placeholder);
				          // Get updated content
				          cont = placeholder;
				        }
				        // convert to plain text and compare strings
				        is_default = (cont == placeholder);

				        // nothing to do
				        if (!is_default) {
				          return;
				        }
				      })
				      .on('focus', function() {
				        // replace the default content on focus if the same as original placeholder
				        if (is_default) {
				          editor.setContent('');
				        }
				      })
			      	  .on("blur", function() {
					        console.log('ON bbbblur');
				         	if (editor.getContent().length === 0) {
						    	editor.setContent(placeholder);
					    	}
				      	});
		      		}

		      		editor.on("blur", function() {
				        
				        $scope.update('content');
			      	});
				},
      			plugins: 'link image code',
      			statusbar:false,
      			

			}

			$scope.tinymceModel = 'Initial content';
      		$rootScope.textAngularOpts={};
        	$rootScope.textAngularOpts.toolbar = ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo','justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent','html', 'insertImage','insertLink', 'insertVideo'];
      	


        	$scope.indexDocument=0;
        	$scope.uploadsDocument=[];

        	$scope.uploadDocument = function (files) {
		        if (files && files.length) {
		            for (var i = 0; i < files.length; i++) {
		                var file = files[i];
		                $scope.uploadsDocument[$scope.indexDocument]={};
		                $scope.uploadsDocument[$scope.indexDocument].file=file;
		                $scope.uploadsDocument[$scope.indexDocument].status='start';
		                $scope.uploadsDocument[$scope.indexDocument].text='0%';
		                $scope.indexDocument++;
		            }
		            for (var i = 0; i < $scope.uploadsDocument.length; i++) {
		                if( $scope.uploadsDocument[i].status=='start'){
		                	
		                    $scope.uploadsDocument[i].status='progress';
		                    (function(i){
			                    Upload.upload({
			                        url: '/article/'+$scope.formData.id+'/documents',
			                        data: {files : $scope.uploadsDocument[i].file,filename:'tt',name:'t'}
			                    }).then(function (data) {
			                        // $scope.formData.documents = data.data.parent.documents
			                        console.log(data);
			                        // $rootScope.$broadcast('articleSelfChange',data.data.parent);
			                        $rootScope.$broadcast('articleSelfChangeDoc',data.data.parent);
			                        // $rootScope.$broadcast('articleSelfChange',data.parent);
			                        $scope.uploadsDocument[i].text='Envoi terminé';
									$scope.touched = true;

			                        (function(i){

	                                    $timeout(function () {
	                                        $scope.uploadsDocument[i].status = 'success';
	                                    },3000)
	                                })(i)
			                    },function (evt) {
			                        //HANDLE ERROR
			                    },function (evt) {
	                                $scope.uploadsDocument[i].progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                                $scope.uploadsDocument[i].text = $scope.uploadsDocument[i].progressPercentage+'%'
			                    });
		                    })(i)
		                }
		            };
		        }
		    };

			$scope.removeDocument=function(doc){
				$rootScope.startSpin();
				articleService.removeDocument($scope.formData.id,doc).then(function(data){
					var index = _.findIndex($scope.formData.documents, function(o) { return o.id == doc; });
					if( index !== -1) {
						$scope.formData.documents.splice(index, 1);
					}
					$rootScope.$broadcast('articleSelfChangeDoc',data);
					//  else {
					// 	$scope.formData.tags.push(tag_with_id);
					// }
					$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}
			$scope.removeImg=function(img){
				$rootScope.startSpin();
				articleService.removeImage($scope.formData.id,img).then(function(data){
					var index = _.findIndex($scope.formData.images, function(o) { return o.id == img; });
					if( index !== -1) {
						$scope.formData.images.splice(index, 1);
					}
					//  else {
					// 	$scope.formData.tags.push(tag_with_id);
					// }
					$rootScope.$broadcast('articleSelfChangeImg',data);
					$rootScope.stopSpin();
				},function(d){
					console.log('EROOR');
				})
			}

        	$scope.indexImage=0;
        	$scope.uploadingImages=[];

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
		        $scope.dataToSend.filename= $scope.imgcrop.filename;
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

		        $sailsSocket.post('/image/resize/',$scope.dataToSend).success(function (data,status) {
		            console.log('SUCCESS RESIZE');
		            $rootScope.stopSpin();
		            
		        }).error(function (data,status) {
		            console.log(data);
		            console.log('errOR');
		        })
	        }

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
					$scope.imgcrop.aspectRatio = '16/9';
					$scope.imgcrop.imgSrc = "";
					$('#imageCropSource').hide();

                    Upload.upload({
                        url: '/article/'+$scope.formData.id+'/images',
                        data: {file :$scope.fileToSend}
                        	// 'displayWidth':$scope.dataToSend.displayWidth,
                        	// 'scaledWidth':$scope.dataToSend.scaledWidth,
                        	// 'scaledHeight':$scope.dataToSend.scaledHeight,
                        	// 'scaledTop':$scope.dataToSend.scaledTop,
                        	// 'scaledLeft':$scope.dataToSend.scaledLeft,
                        	// 'aspectRatio':$scope.dataToSend.aspectRatio,
                        	// 'landscape':$scope.dataToSend.landscape,
                        
                    }).then(function (data) {
                    	console.log(data);
                    	console.log(data.data.child);
                    	$rootScope.$broadcast('articleSelfChangeImg',data.data.parent);
                    	// $scope.formData.images.push(data.data.child)
                    	$scope.dataToSend.imgid= data.data.child.id;
                    	$scope.dataToSend.filename= data.data.child.filename;
                    	$rootScope.startSpin();
      					$sailsSocket.post('/image/resize/',$scope.dataToSend).success(function (data,status) {
				            console.log('SUCCESS RESIZE');
				            $rootScope.stopSpin();
				          
				        }).error(function (data,status) {
				            console.log(data);
				            console.log('errOR');
				        })


                        $scope.uploadingImages[indexImage].text='Envoi terminé';
						$scope.touched = true;

                        (function(indexImage){

                            $timeout(function () {
                                $scope.uploadingImages[indexImage].status = 'success';
                            },3000)
                        })(indexImage)
                    },function (evt) {
                        //HANDLE ERROR
                    },function (evt) {
                        $scope.uploadingImages[indexImage].progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.uploadingImages[indexImage].text = $scope.uploadingImages[indexImage].progressPercentage+'%'
                    });
                })($scope.indexImage)
		        $scope.indexImage++;
		    };
		    $scope.changeOrientation=function(){
		    	if($scope.imgcrop.landscape)
		    	{
		    		$scope.imgcrop.landscape = false;
		    		$scope.imgcrop.aspectRatio = $scope.imgcrop.aspectRatioPortrait
		    	}else{
		    		$scope.imgcrop.landscape = true;
		    		$scope.imgcrop.aspectRatio = $scope.imgcrop.aspectRatioPaysage
		    	}
		    }
		    $scope.resizeagain=function(img){
		    	console.log(img);

		    	$scope.imgcrop.imgSrc = 'image/originalSize/'+img.filename;
		    	$scope.imgcrop.imgEditId = img.id;
		    	$scope.imgcrop.filename = img.filename;
				
		    }
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
			$scope.imgcrop.aspectRatio = '16/9';
			$scope.imgcrop.imgSrc = "";
			$scope.imgcrop.aspectRatioPaysage = '16/9';
			$scope.imgcrop.aspectRatioPortrait = '3/4';

			
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
					
				},1)
				// $scope.$applyAsync();
			}
			// $scope.removeImage=function(doc){
			// 	$rootScope.startSpin();
			// 	articleService.removeImage($scope.formData.id,doc).then(function(data){
			// 		var index = _.findIndex($scope.formData.documents, function(o) { return o.id == doc; });
			// 		if( index !== -1) {
			// 			$scope.formData.documents.splice(index, 1);
			// 		}
			// 		//  else {
			// 		// 	$scope.formData.tags.push(tag_with_id);
			// 		// }
			// 		$rootScope.stopSpin();
			// 	},function(d){
			// 		console.log('EROOR');
			// 	})
			// }
			$scope.titi = [{name:'riri'},{name:'loulou'},{name:'fifi'},{name:'picsous'}]

			$scope.formData.images = _.orderBy($scope.formData.images,'rank')

			$scope.sortOption={
				'ui-floating':true,
				stop: function(e, ui) {
					console.log('UPDATE');
					console.log($scope.formData.images);
					var allImages = $scope.formData.images
					console.log(allImages);

					for(var i=0; i< allImages.length; i++)
					{
						console.log(i);
						console.log(allImages[i].name);
						$rootScope.startSpin();
						imageService.saveImage(allImages[i].id,{rank:i}).then(function(d){
							$rootScope.stopSpin();
							console.log('cool');
							
						})
					}



					console.log(allImages);
// saveImage
					// imageService.saveIndex($scope.formData.images).then(function(d){

					// 	console.log('cool');
						
					// })

					// console.log($scope.formData.images);
					// console.log(ui);
					// console.log(e);
				    // if (ui.item.sortable.model == "can't be moved") {
				    //     ui.item.sortable.cancel();
				    // }
				},

				start:function(e,ui) {
					console.log('START');
					console.log($scope.formData.images);
				}
			};

      	},
      	link:function(scope,element,attrs){
      		


			// scope.textAngularOptions={};

			// scope.textAngularOptions = ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo','justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent','html', 'insertImage','insertLink', 'insertVideo'];
		  	// scope.textAngularOptions = [['h1','h2','h3'],['bold','italics']]
      	}
    };

});