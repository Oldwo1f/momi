
angular.module('core')
  .directive('menuWidget',["widgetService", "$compile", "$timeout", function (widgetService,$compile,$timeout){
    'use strict';



    var thisresize = function(item){
        	var classToSet= '' ,classFont='smallFont';
        	var x = item.sizeX, y = item.sizeY;
        	if(x == 1 )
        	{
        		if(y < 3){
        			classToSet = 'style0';
        		}
        		else{
        			classToSet = 'style1';
        			if(y <= 4 )
        				classFont='smallFont';
        			else if(y > 4 && y<=6)
        				classFont='mediumFont';
        			else if(y > 6 && y<=8)
        				classFont='largeFont';
        			else
        				classFont='extralargeFont';
        		}



        	}
        	if(x == 2 )
        	{
        		if(y < 3){
        			classToSet = 'style0';
           		}
        		else{
        			classToSet = 'style2';
        			if(y <= 4)
        				classFont='smallFont';
        			else if(y>4 && y<=8){
        				classToSet = 'style2';
        				classFont='mediumFont';
        			}else{
        				classToSet = 'style5';
        				classFont='mediumFont';
        			}
        		}

        	}
        	if(x == 3 )
        	{
        		if(y < 2)
        			classToSet = 'style0';
        		else{
        			classToSet = 'style3';
        			if(y <= 4)
        				classFont='smallFont';
        			else if(y>4 && y<= 7)
        				classFont='mediumFont';
        			else{
        				classToSet = 'style5';
        				classFont='largeFont';
        			}

        			if(y == 2){
        				classToSet = 'style15';
        				classFont='smallFont';
        			}
        		}

        	}
        	if(x == 4 )
        	{
        		if(y < 3){

        			classToSet = 'style0';
        			classFont='smallFont';
        		}
        		else {
        			if(y <= 5){
        				classFont='mediumFont';
        				classToSet = 'style4';
        			}
        			else if(y>5 && y<= 7){
        				classFont='largeFont';
        				classToSet = 'style4';
        			}
        			else{
        				classFont='extralargeFont';
        				classToSet = 'style5';
        			}
        		}
        		if(y < 4 && y > 1){

        			classToSet = 'style6';
        			classFont='mediumFont';
        		}


        	}
        	if(x == 5 )
        	{
        		if(y <=1){

        			classToSet = 'style0';
        			classFont='smallFont';
        		}
        		else if(y < 4 && y > 1){

        			classToSet = 'style7';
        			classFont='mediumFont';
        		}
        		else if(y >= 4){

        			classToSet = 'style8';
        			classFont='mediumFont';

	        		if(y >= 6){
	        			classFont='largeFont';
	        		}

        		}

        	}
        	if(x > 5 )
        	{
        		if(y >3){

        			classToSet = 'style0';
        			classFont='smallFont';
        		}
        		if(y == 1){

        			classToSet = 'style10';
        			classFont='smallFont';
        		}
        		if(y ==2 || y== 3){
        			classToSet = 'style9';
        			classFont='mediumFont';
        		}
        		if(y >= 4){

        			classToSet = 'style8';
        			classFont='largeFont';
        		}

        	}
        	if(x > 6)
        	{
        		if(y > 2){
        			classToSet = 'style0';
        			classFont='smallFont';
        		}
        		if(y == 2){
        			classToSet = 'style11';
        			classFont='mediumFont';
        			if(x > 8)
        			{
        				classToSet = 'style12';
        				classFont='largeFont';
        			}
        		}
        		if(y == 1){
        			classToSet = 'style10';
        			classFont='mediumFont';
        			if(x > 12)
        			{
        				classToSet = 'style13';
        				classFont='mediumFont';
        			}
        			if(x > 16)
        			{
        				classToSet = 'style14';
        				classFont='largeFont';
        			}
        		}

        	}


        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('menuWidget')
    	
    }




    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/menuWidget.html',
      link:function(scope,element,attrs){
      	thisresize(scope.$parent.gridsterItem)


          // scope.gridster.draggable.enabled = false;
          // scope.gridster.resizable.enabled = false;



      	scope.$parent.$on('gridster-item-resized', function(e,item) {
        	thisresize(item);
		})

      	scope.$parent.$on('gridster-item-transition-end', function(e,item) {
      		// console.log('Listen fore titleDash ---->initialized');

		})
		scope.$parent.$on('gridster-item-initialized', function(item) {
          console.log(' INIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIT ');
          // resize();
        })

      }
    };

}]);