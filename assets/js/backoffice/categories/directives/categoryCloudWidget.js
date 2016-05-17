angular.module('core')
  .directive('categorycloudWidget', function (widgetService,categoryService){
    var toto;
    'use strict';
    var thisresize = function(item, first, categoriesCloud,cloudCatOpts){

        console.log(item);

        	var classToSet= 'style1' ,classFont='smallFont';
        	var x = item.sizeX, y = item.sizeY;

            if(y < 2 || x < 3){
               classToSet = 'style0'; 
            }

            if(y >12 || x >12){
               classToSet = 'style0'; 
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
    if(classToSet == 'style1')
        $('#cloudCat').css('height' , item.getElementSizeY()-20 +'px')

    $('#cloudCat').css('width' , item.getElementSizeX()-20 +'px')

    if(first == 'first'){
        console.log('first');
        // $('#cloudCat').jQCloud('destroy'); 
    }
    else{
        console.log('pas first');
        console.log(categoriesCloud);
        console.log(cloudCatOpts);
        cloudCatOpts.height = item.getElementSizeY()-94
         if(classToSet == 'style1')
            cloudCatOpts.height=  item.getElementSizeY()-20
        cloudCatOpts.width = item.getElementSizeX()-20
        $('#cloudCat').jQCloud('destroy'); 

        $('#cloudCat').jQCloud(categoriesCloud, cloudCatOpts);
//         console.log(toto);
//         $('#cloudCat').jQCloud('destroy'); 
//         delete categoriesCloud['height']
//         delete categoriesCloud['width']
//         console.log(categoriesCloud);
//         var tmp = [];
//         _.map(categoriesCloud,function(o){
//             console.log(typeof(o));
//             if(typeof(o) == 'object')
//             {
//               if(o.weight) {
//                 tmp.push(o)  
//               };
//             }
//         })

// console.log(tmp);
//         $('#cloudCat').jQCloud('update',tmp);      
    }

    
   	
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('categorycloudWidget')
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/categories/partials/categoryCloudWidget.html',
      controller:function($scope,categoryService,$state){
            
        $scope.cloudCatOpts = {
            steps: 10,
            autoResize:true,
            delay:100,
            autoUpdate:function(){
                console.log('autoupdate');
            },
            // width:200,
            // height:150,
            afterCloudRender:function(){
                console.log('afterCloudRender');
            }
        } 
            // $scope.editArticleState=function(id){
                
            //     console.log('editArticleState');
            //     $state.go('dashboard/blog/edit',{id:id})
            // }
      },
      link:function(scope,element,attrs){


         
      	console.log('categorycloudWidget');

        categoryService.fetchAll().then(function(data){
          console.log(data);
          data = _.map(data,function(c){

            return {'text':c.name,'weight':c.total,html:{
              'title': c.total,
              'style': 'background:'+c.color+';'+'color:'+c.textColor+'; padding: 2px 5px;border-radius:3px;'
            }}
            
          })
          
            thisresize(scope.$parent.gridsterItem, 'first', scope.categoriesCloud)
            console.log(scope.categoriesCloud);
            scope.categoriesCloud =data
            console.log(scope.cloudCatOpts);
            $('#cloudCat').jQCloud(scope.categoriesCloud, scope.cloudCatOpts);

          // scope.$applyAsync()
        }).catch(function(e){
          console.log(e);
        })

        scope.resizeCloud=function(item){
                console.log('resizeCloudresizeCloudresizeCloudresizeCloudresizeCloudresizeCloudresizeCloudresizeCloudresizeCloud');
                
                // $('#cloudCat').jQCloud('destroy'); 
                // // $('#cloudCat').jQCloud('update',categoriesCloud);      
                // $('#cloudCat').jQCloud('update', [{text:'titi',weight:3},{text:'tate',weight:2},{text:'heyho',weight:1}]); 
        }

      	scope.$parent.$on('gridster-item-resized', function(e,item) {
      		console.log('Listen fore titleDash resize');
            delete scope.categoriesCloud['height']
            delete scope.categoriesCloud['width']
            console.log(scope.categoriesCloud);
            var tmp = scope.categoriesCloud
            toto = tmp
      		thisresize(item,'null',tmp,scope.cloudCatOpts);

            // scope.resizeCloud(item)

      		
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