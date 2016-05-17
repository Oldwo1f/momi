angular.module('core')
  .directive('lastarticleWidget', function (widgetService,articleService){

    'use strict';
    var thisresize = function(item){

        console.log(item);

        	var classToSet= 'style0' ,classFont='smallFont';
        	var x = item.sizeX, y = item.sizeY;

            if(y < 2){
               classToSet = 'style0'; 
           }else
           if(y == 2){
                classToSet= 'style0';
           }else
           if(y == 3){
                classToSet= 'style2';
                if(x <=4){
                    classToSet= 'style0';

                }
           }else
           if(y >= 4){
                classToSet= 'style1';
                if(x <=4){
                    classToSet= 'style0';
                }
           }
           if(y >= 7){
               
                    classToSet= 'style0';
           }
           if(x == 5){
                if(y >= 5){
                    classToSet= 'style0';
                }
           }
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
    
    console.log(item.gridster);
    console.log(item.getElementSizeX());
    console.log(item.getElementSizeY());
    $('.RESIZEHEIGHT').height(item.getElementSizeY()-94)
    $('.card-media ').height(item.getElementSizeY()-125)
    $('.card-media ').width(item.getElementSizeY()-125)
        	
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('lastarticleWidget')
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/blog/partials/lastArticleWidget.html',
      controller:function($scope,articleService,$state){
            $scope.editArticleState=function(id){
                
                console.log('editArticleState');
                $state.go('dashboard/blog/edit',{id:id})
            }
        console.log('dashTitle directive controller');
      },
      link:function(scope,element,attrs){


      		
      	// console.log(scope.gridsterItem);
      	thisresize(scope.$parent.gridsterItem)

        articleService.fetchLast().then(function(data){
          console.log(data);
          scope.lastArticle = data;
          scope.$applyAsync()
        }).catch(function(e){
          console.log(e);
        })


      	scope.$parent.$on('gridster-item-resized', function(e,item) {
      		console.log('Listen fore titleDash resize');
      		thisresize(item)

      		
		    })
      	scope.$parent.$on('gridster-item-transition-end', function(e,item) {
      		// console.log('Listen fore titleDash ---->initialized');
// console.log(scope.widgetList);

      		// widgetService.changeDash(scope.widgetList);
      		// console.log(item);
		    // sizes[0] = width
		    // sizes[1] = height
		    // gridster.
		    })

      }
    };

});