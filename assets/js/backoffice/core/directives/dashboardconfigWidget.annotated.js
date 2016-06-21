
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
      setTimeout(function(){
        $('#resheight').height(item.getElementSizeY()-64)
        $('#resheight').getNiceScroll().resize();
      },1)
      // $('.notificationWidget #resheight').getNiceScroll().resize();

    	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
    	.addClass(classToSet+ ' ' + classFont)
    	.addClass('dashboardconfigWidget')
	}
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/core/partials/dashboardconfigWidget.html',
      controller:["$scope", "$rootScope", "userService", "$auth", function($scope,$rootScope,userService,$auth){
            $scope.changeTheme =function(theme){
              console.log(theme);
                  $scope.currentTheme = theme;
                  // $rootScope.startSpin()
                 $rootScope.$broadcast('changeTheme',$scope.currentTheme);
            }

            $scope.$on('geniechangeTheme',function(e,data){ch
                console.log('geniechangeTheme');
               $scope.changeTheme(data)
                   // console.log('EnterEditModeEND');e
                   // $scope.toogleEditMode()
            });
            $scope.$on('EnterEditMode',function(data){
                  $scope.toogleEditMode()
            });
            $scope.$on('saveDashBoard',function(data){
                   // console.log('EnterEditModeEND');e
                   $scope.saveDash()
            });
             // }
            $scope.optionScroll = {
              cursorcolor:'#FFFFFF',
              cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
              cursoropacitymax: 0.3,
              cursorborder:'none',
              railoffset: {left:-5}
            }
      }],
      link:function(scope,element,attrs){
      	// scope.currentTheme = 'bg3';
        scope.currentTheme='bg1';
      	scope.editionMode = false;
      	scope.expanded = false;
        scope.widgetList = widgetService.list;
      	thisresize(scope.$parent.gridsterItem,scope.expanded)

        // scope.$parent.gridster.columns= 6;
        // console.log(scope.$parent.gridster.columns);

        // scope.$watch('currentTheme',function(){
        // 	scope.$emit('changeTheme',scope.currentTheme);
        // })
      // $(window).resize(function() {

      //   var winwidth = $(window).width()
      //   var col=24;
      //   if(winwidth <=1024){
      //       col=16
      //   }
      //   if(winwidth <=800){
      //       col=10
      //   }
      //   console.log('coolcool');
      //   scope.$parent.gridster.columns= col;
      // })

      	scope.$parent.$on('gridster-item-resized', function(e,item) {
      		thisresize(item,scope.expanded);
		    
		    })

        scope.saveDash = function(){
        	if(scope.expanded){
        		scope.expandWidget();
        		setTimeout(function(){
          			widgetService.changeDash(scope.currentTheme);
	          	},300);
        	}else{
          		widgetService.changeDash(scope.currentTheme);
        		
        	}
          scope.editionMode = false;
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
        var originalHeight;
      	scope.expandWidget = function(){

          scope.expanded = !scope.expanded;
          var $parent = element.parent();
          var $widget__header = $('.dashboardconfigWidget .widget__header');
          console.log(originalHeight);
          if(scope.expanded)
          {
            originalHeight = $widget__header.height()

          	$widget__header.css({'height': '64px'})
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
              console.log(originalHeight);
          		$widget__header.css({'height': originalHeight + 'px'})
          	},300);
          		
          }

        }
      }
    };

}]);