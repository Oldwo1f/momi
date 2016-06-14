angular.module('core')
  .directive('notificationWidget', ["widgetService", "notificationService", "$state", function (widgetService,notificationService,$state){

    'use strict';
    var thisresize = function(item){


        	var classToSet= 'style1' ,classFont='mediumFont';
        	var x = item.sizeX, y = item.sizeY;

            if(y < 3){
               classToSet = 'style0'; 
           }else
           if(x < 3 || x > 10){
              classToSet = 'style0'; 
           }
           // if(y == 2){
           //      classToSet= 'style0';
           // }else
           // if(y == 3){
           //      classToSet= 'style2';
           //      if(x <=4){
           //          classToSet= 'style0';

           //      }
           // }else
           // if(y >= 4){
           //      classToSet= 'style1';
           //      if(x <=4){
           //          classToSet= 'style0';
           //      }
           // }
           // if(y >= 7){
               
           //          classToSet= 'style0';
           // }
           // if(x == 5){
           //      if(y >= 5){
           //          classToSet= 'style0';
           //      }
           // }
        // if(x < 5)
        //   {
        //       classToSet = 'style0';
        //   }else
        //   if(x >= 5 && x < 7)
        //   {
        //         if(y < 5){
        //             classToSet = 'style1';

        //         }else
        //         {
        //             classToSet = 'style4';
        //         }
        //   }else
        //   if(x >= 8 && x < 12)
        // 	{
        //         if(y < 4){
        // 			classToSet = 'style2';

        //         }else
        //         {
        //             classToSet = 'style3';
        //         }
        // 	}else
        //   {
        //       classToSet = 'style0';
        //   }
  
        	
    //     	if(x > 3 && x <= 5 && y <=4)
    //     	{
				// 	classToSet = 'style6';
				// 	classFont='extralargeFont';
    //     	}
    //     	if(y ==1)
    //     	{
	   //      	if(x <= 3)
	   //      	{
				// 		classToSet = 'style0';
				// 		classFont='mediumFont';
	   //      	}
	   //      	if(x > 3)
	   //      	{
				// 		classToSet = 'style7';
				// 		classFont='mediumFont';
	   //      	}
	   //      	if(x > 5)
	   //      	{
				// 		classToSet = 'style8';
				// 		classFont='mediumFont';
	   //      	}
	   //      	if(x > 8)
	   //      	{
				// 		classToSet = 'style9';
				// 		classFont='largeFont';
	   //      	}
    //     	}
    setTimeout(function(){
      $('.notificationWidget .RESIZEHEIGHT').height(item.getElementSizeY()-84)
      $('#noNotifElment').height(item.getElementSizeY()-84)
      $('.notificationWidget .RESIZEHEIGHT').getNiceScroll().resize();
    },1)
        	
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/notificationWidget.html',
      controller:["$scope", "notificationService", "$state", "$sailsSocket", "$rootScope", function($scope,notificationService,$state,$sailsSocket,$rootScope){

            var BIP = new Audio('bip.wav');
                

            notificationService.fetchLast().then(function(data){
                $scope.notifs = data;
                var notifsNew = [];
                _.map($scope.notifs, function(o){if(o.status == 'new'){notifsNew.push(o); } return true;})
                $rootScope.nbNotifs = notifsNew.length;
                $scope.nbNotifs = $rootScope.nbNotifs;
                if($scope.nbNotifs > 0){
                    BIP.play();
                }
                $scope.$applyAsync()
            }).catch(function(e){
            })
            $sailsSocket.subscribe('notification',function(data){
                console.log('ON notification');
                console.log(data);
              
                if(data.verb =='created'){

                    $scope.notifs.unshift(data.data)
                    var notifsNew = [];
                    _.map($scope.notifs, function(o){if(o.status == 'new'){notifsNew.push(o); } return true;})
                    $rootScope.nbNotifs = notifsNew.length;
                    $scope.nbNotifs = $rootScope.nbNotifs;
                    BIP.play();
                }
                if(data.verb =='updated'){

                    console.log('updated');
                    console.log(data.id);
                    if(data.data.status){
                        var index = _.findIndex($scope.notifs, function(o) { return o.id == data.id; });
                        if( index !== -1) {
                          $scope.notifs[index].status = data.data.status
                          // console.log(data.data);
                        }
                    }
                        var notifsNew = [];
                        _.map($scope.notifs, function(o){if(o.status == 'new'){notifsNew.push(o); } return true;})
                        $rootScope.nbNotifs = notifsNew.length;
                        $scope.nbNotifs = $rootScope.nbNotifs;

                    // // console.log($scope.articlesList);
                   
                }
            });
            // $scope.editArticleState=function(id){
                
            //     $state.go('dashboard/blog/edit',{id:id})
            // }
            $scope.optionScroll = {
              cursorcolor:'#FFFFFF',
              cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
              cursoropacitymax: 0.3,
              cursorborder:'none',
              railoffset: {left:8}
            }
            $scope.goTo= function(type,id){
                if(type == 'commentArticle'){
                    $state.go('blog.edit',{id:id})
                }
                if(type == 'commentProject'){
                    $state.go('projects.edit',{id:id})
                }
            }
      }],
      link:function(scope,element,attrs){


      		
      	thisresize(scope.$parent.gridsterItem)

        


      	scope.$parent.$on('gridster-item-resized', function(e,item) {
      		thisresize(item)

      		
		    })
      	scope.$parent.$on('gridster-item-transition-end', function(e,item) {

      		// widgetService.changeDash(scope.widgetList);
		    // sizes[0] = width
		    // sizes[1] = height
		    // gridster.
		    })

      }
    };

}]);