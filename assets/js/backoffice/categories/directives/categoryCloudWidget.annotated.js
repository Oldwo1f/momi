angular.module('core')
  .directive('categorycloudWidget', ["widgetService", "categoryService", "$sailsSocket", "$rootScope", function (widgetService,categoryService,$sailsSocket,$rootScope){
    var toto;
    'use strict';
    var thisresize = function(item, first, categoriesCloud,cloudCatOpts){


        	var classToSet= 'style1' ,classFont='smallFont';
        	var x = item.sizeX, y = item.sizeY;

            if(y < 2 || x < 3){
               classToSet = 'style0'; 
            }

            if(y >12 || x >12){
               classToSet = 'style0'; 
            }
            if(x+y >10){
               classFont = 'mediumFont'; 
            }
            if(y+x > 15){
               classFont = 'largeFont'; 
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
    // $('#cloudCat').jQCloud('destroy');

    $('#cloudCat').css('height' , item.getElementSizeY()-94 +'px')
    $('#noCatElment').css('height' , item.getElementSizeY()-94 +'px')
    if(classToSet == 'style1')
        $('#cloudCat').css('height' , item.getElementSizeY()-20 +'px')
        $('#noCatElment').css('height' , item.getElementSizeY()-20 +'px')

    $('#cloudCat').css('width' , item.getElementSizeX()-20 +'px')

    if(first == 'first'){
    }
    else{
        
        cloudCatOpts.height = item.getElementSizeY()-94
        if(classToSet == 'style1')
            cloudCatOpts.height=  item.getElementSizeY()-20
        cloudCatOpts.width = item.getElementSizeX()-20
        $('#cloudCat').jQCloud('destroy'); 

        $('#cloudCat').jQCloud(categoriesCloud, cloudCatOpts);
  
    }

    
   	
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('categorycloudWidget')
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/categories/partials/categoryCloudWidget.html',
      controller:["$scope", "categoryService", "$state", "$rootScope", function($scope,categoryService,$state,$rootScope){
            
        $scope.cloudCatOpts = {
            steps: 10,
            autoResize:true,
            delay:100,
            // removeOverflowing:false,
            afterCloudRender:function(){
            }
        }
              
           
      }],
      link:function(scope,element,attrs){
        $rootScope.$on('categorySelfChange',function(e,data){
                    var index = _.findIndex(scope.categoriesCloud, function(o) { return o.myid == data.id; });
                    if( index !== -1) {

                        var dataUsable = {};
                            dataUsable.text = data.name
                            dataUsable.myid = data.id
                            dataUsable.html = {};
                            dataUsable.weight = data.total
                            dataUsable.html.title = data.total
                         
                            dataUsable.html.style = 'background:'+data.color+';'+ 'color:'+data.textColor+';'
                            dataUsable.savedcolor = data.color
                            dataUsable.savedtextColor = data.textColor
                            dataUsable.html.class = 'CatInCloud'
                        
                        _.merge(scope.categoriesCloud[index], dataUsable)
                        $('#cloudCat').jQCloud('update', scope.categoriesCloud);

                    }
            })
        $sailsSocket.subscribe('category',function(data){
                
                if(data.verb =='updated'){

                    var index = _.findIndex(scope.categoriesCloud, function(o) { return o.myid == data.id; });
                    if( index !== -1) {

                        var dataUsable = {};
                        if(data.data.name)
                            dataUsable.text = data.data.name
                        if(data.data.id)
                            dataUsable.myid = data.data.id
                        dataUsable.html = {};
                        if(data.data.total){
                            dataUsable.weight = data.data.total
                            dataUsable.html.title = data.data.total
                        }
                        if(data.data.color){
                            dataUsable.html.style = 'background:'+data.data.color+';'+ 'color:'+scope.categoriesCloud[index].savedtextColor+';'
                            dataUsable.savedcolor = data.data.color
                            
                        }
                        if(data.data.textColor){
                          dataUsable.html.style = 'background:'+scope.categoriesCloud[index].savedcolor+';'+ 'color:'+data.data.textColor+';'
                          dataUsable.savedtextColor = data.data.textColor
                        }
                            dataUsable.html.class = 'CatInCloud'
                        
                        _.merge(scope.categoriesCloud[index], dataUsable)
                        $('#cloudCat').jQCloud('update', scope.categoriesCloud);

                    }
                }                
                if(data.verb =='created'){

                    data = data.data

                    var dataUsable = {};
                        dataUsable.text = data.name
                        dataUsable.myid = data.id
                        dataUsable.html = {};
                        dataUsable.weight = data.total
                        dataUsable.html.title = data.total
                     
                        dataUsable.html.style = 'background:'+data.color+';'+ 'color:'+data.textColor+';'
                        dataUsable.savedcolor = data.color
                        dataUsable.savedtextColor = data.textColor
                        dataUsable.html.class = 'CatInCloud'
                    
                    scope.categoriesCloud.push(dataUsable)
                    $('#cloudCat').jQCloud('update', scope.categoriesCloud);
                }              
                if(data.verb =='destroyed'){
                    var index = _.findIndex(scope.categoriesCloud, function(o) { return o.myid == data.id; });
                    if( index !== -1) {
                        
                        scope.categoriesCloud.splice(index,1)
                    }    

                        
                        
                    $('#cloudCat').jQCloud('update', scope.categoriesCloud);
                }
               
        })
         

        categoryService.fetchAll().then(function(data){
          data = _.map(data,function(c){

            return {'text':c.name,'myid':c.id,'weight':c.total,

                  'savedcolor':c.color,
                  'savedtextColor':c.textColor,
                html:{
                  'title': c.total,
                  'style': 'background:'+c.color+';'+'color:'+c.textColor+';',
                  'class': 'CatInCloud',
                }
            }
            
          })
          
            thisresize(scope.$parent.gridsterItem, 'first', scope.categoriesCloud)
            scope.categoriesCloud =data
            $('#cloudCat').jQCloud(scope.categoriesCloud, scope.cloudCatOpts);


          // scope.$applyAsync()
        }).catch(function(e){
        })
      	scope.$parent.$on('gridster-item-resized', function(e,item) {
            delete scope.categoriesCloud['height']
            delete scope.categoriesCloud['width']
            var tmp = scope.categoriesCloud
      		thisresize(item,'null',tmp,scope.cloudCatOpts);


      		
		})
      	scope.$parent.$on('gridster-item-transition-end', function(e,item) {
      		
		})

      }
    };

}]);