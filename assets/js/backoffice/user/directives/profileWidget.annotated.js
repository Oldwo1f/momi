angular.module('core')
  .directive('profileWidget', ["widgetService", "userService", "$state", function (widgetService,userService,$state){

    'use strict';
    var thisresize = function(item){


        	var classToSet= 'style0' ,classFont='smallFont';
        	var x = item.sizeX, y = item.sizeY;

           if(y < 2){
               classToSet = 'style0'; 
           }else
           if(y == 2){
              if(x>3 && x < 9){
                classToSet= 'style6';
                classFont='mediumFont'
              }
              if(x>4 && x < 9){
                classToSet= 'style1';
                classFont='mediumFont'
              }
           }else
           if(y == 3){
              if(x>3 && x < 9){
                classToSet= 'style4';
                classFont='largeFont'
              }
              if(x>5 && x < 9){
                classToSet= 'style2';
                classFont='largeFont'
              }
              if(x>6 && x < 9){
                classToSet= 'style3';
                classFont='largeFont'
              }
           }
           if(y > 3 && y < 8){
              if(x>3 && x < 9){
                classToSet= 'style7';
                classFont='largeFont'
              }
              // if(x>5 && x < 9){
              //   classToSet= 'style2';
              //   classFont='largeFont'
              // }
              // if(x>6 && x < 9){
              //   classToSet= 'style3';
              //   classFont='largeFont'
              // }
           }
           // if(y > 3 && y < 10){
           //    if(x>5 && x < 9){
           //      classToSet= 'style2';
           //      classFont='largeFont'
           //    }
           // }
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
        if(classToSet =="style7"){
            var h = ($('.imgdiv').height() < 150) ? $('.imgdiv').height() : 150;
            $('.profileWidget .Myprofileimage').height(h);
            setTimeout(function(){
                $('.profileWidget .Myprofileimage').height(h);
                
            },1000)
        }
        else
          $('.profileWidget .Myprofileimage').height('100%');
    },100)

    $('.profileWidget .RESIZEHEIGHT').height(item.getElementSizeY() -20)
   
        	
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('profileWidget')
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/user/partials/profileWidget.html',
      controller:["$scope", "userService", "$state", "$rootScope", function($scope,userService,$state,$rootScope){
        $rootScope.$on('profileChange',function(e,data){
            console.log('profileChange');
            $scope.user = data;
            
        })
            // $scope.editArticleState=function(id){
                
            //     $state.go('dashboard/blog/edit',{id:id})
            // }
            $scope.countNotif = 155;
            $scope.countMessage = 4;
      }],
      link:function(scope,element,attrs){


      		
      	thisresize(scope.$parent.gridsterItem)


        console.log('LINK PROFILE');
        userService.selfProfile().then(function(data){
          scope.user = data;
          scope.$applyAsync()
        }).catch(function(e){
        })


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