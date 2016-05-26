
angular.module('core')
  .directive('dashboardconfigWidget',["widgetService", "$compile", "$timeout", "$rootScope", function (widgetService,$compile,$timeout,$rootScope){
    'use strict';
	var thisresize = function(item,expanded){

    	var classToSet= 'style0' ,classFont='smallFont';
    	var x = item.sizeX, y = item.sizeY;
    	if(y == 1 || y == 2)
    	{
    			classToSet = 'style1';
    			classFont='smallFont';
    			if(y==2)
    			{
    				classFont='largeFont';
    			}
    		if(x <7 || x > 12)
    		{
    			classToSet = 'style0';
    		}
    	}
    	if(expanded)
    	{

    	}else{

    	}


    	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
    	.addClass(classToSet+ ' ' + classFont)
    	.addClass('dashboardconfigWidget')
	}
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/dashboardconfigWidget.html',
      link:function(scope,element,attrs){
      	// scope.currentTheme = 'bg3';
      	scope.editionMode = false;
      	scope.expanded = false;
        scope.widgetList = widgetService.list;
      	thisresize(scope.$parent.gridsterItem,scope.expanded)




        scope.$watch('currentTheme',function(){
        	scope.$emit('changeTheme',scope.currentTheme);
        })

      	scope.$parent.$on('gridster-item-resized', function(e,item) {
      		thisresize(item,scope.expanded);
		    
		    })

        scope.saveDash = function(){
        	if(scope.expanded){
        		scope.expandWidget();
        		setTimeout(function(){
          			widgetService.changeDash();
	          	},300);
        	}else{
          		widgetService.changeDash();
        		
        	}

        }

      	scope.toogleEditMode = function(){
          

          scope.editionMode = !scope.editionMode;
          if(scope.editionMode)
          {
          	scope.$parent.gridster.draggable.enabled = true;
        	  scope.$parent.gridster.resizable.enabled = true;
        	$('.dragger').show()
          }else{
          	scope.$parent.gridster.draggable.enabled = false;
        	  scope.$parent.gridster.resizable.enabled = false;
        	$('.dragger').hide()
          }

        }
      	scope.restoreDefault = function(){
          	scope.$emit('restoreDefault',scope.currentTheme);
          	

        }

      	scope.expandWidget = function(){

          scope.expanded = !scope.expanded;
          var $parent = element.parent();
          var $widget__header = $('.widget__header');
          if(scope.expanded)
          {
          	$widget__header.css({'height': $widget__header.height()})
          	$parent.addClass('expanded');
          	if($parent.hasClass('largeFont')){
          		$parent.addClass('saveLargeFont');
          	}
          	scope.$parent.gridsterItem.sizeY = scope.$parent.gridsterItem.sizeY + 4;
          }else{
          	$parent.removeClass('expanded saveLargeFont');
          	scope.$parent.gridsterItem.sizeY = scope.$parent.gridsterItem.sizeY - 4;
          	//Wait the end of transition to not blink wrong size element
          	setTimeout(function(){
          		$widget__header.css({'height': '100%'})
          	},300);
          		
          }

        }
      }
    };

}]);