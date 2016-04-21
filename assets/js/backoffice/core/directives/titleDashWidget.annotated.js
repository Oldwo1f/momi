angular.module('core')
  .directive('titleDashWidget', ["widgetService", function (widgetService){

    'use strict';
    var thisresize = function(item){

        	var classToSet= 'style0' ,classFont='smallFont';
        	var x = item.sizeX, y = item.sizeY;
        	if(x == 1  || x ==2)
        	{
        		if(y < 3){
        			classToSet = 'style0';
        		}
        		else{
        			if(y <= 4 ){
        				classToSet = 'style1';
        				classFont='smallFont';
        			}
        			else if(y > 4 && y<=6){
        				classToSet = 'style2';
        				classFont='largeFont';
        			}
        			else if(y > 6 && y<=8){
        				classToSet = 'style2';
        				classFont='extralargeFont';
        			}
        		}
        	}
        	if(x == 2  && y ==2)
        	{
        		
				classToSet = 'style3';
				classFont='mediumFont';
        			
        	}
        	if(x == 3 )
        	{
        		if( y < 2){
					classToSet = 'style0';
					classFont='smallFont';
        		}else
        		if( y ==2){
					classToSet = 'style4';
					classFont='extralargeFont';
        		}else
        		if( y ==3){
					classToSet = 'style5';
					classFont='extralargeFont';
        		}
        			
        	}
        	if(x > 3 && x <= 5 && y <=4)
        	{
					classToSet = 'style6';
					classFont='extralargeFont';
        	}
        	if(y ==1)
        	{
	        	if(x <= 3)
	        	{
						classToSet = 'style0';
						classFont='mediumFont';
	        	}
	        	if(x > 3)
	        	{
						classToSet = 'style7';
						classFont='mediumFont';
	        	}
	        	if(x > 5)
	        	{
						classToSet = 'style8';
						classFont='mediumFont';
	        	}
	        	if(x > 8)
	        	{
						classToSet = 'style9';
						classFont='largeFont';
	        	}
        	}
        	// item.$element.hasClass('expanded')
        	// if()
        	// console.log(classToSet);
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('titleDashWidget')
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/titleDashWidget.html',
      link:function(scope,element,attrs){
      	console.log('dashTitle directive');
      		
      	// console.log(scope.gridsterItem);
      	thisresize(scope.$parent.gridsterItem)

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

}]);