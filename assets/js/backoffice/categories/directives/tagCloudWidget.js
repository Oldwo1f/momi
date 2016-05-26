angular.module('core')
  .directive('tagcloudWidget', function (widgetService,tagService,$sailsSocket,$rootScope){
    var toto;
    'use strict';
    var thisresize = function(item, first, tagsCloud,cloudTagOpts){


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
    // $('#cloudTag').jQCloud('destroy');

    $('#cloudTag').css('height' , item.getElementSizeY()-94 +'px')
    $('#noTagElment').css('height' , item.getElementSizeY()-94 +'px')
    if(classToSet == 'style1')
        $('#cloudTag').css('height' , item.getElementSizeY()-20 +'px')
        $('#noTagElment').css('height' , item.getElementSizeY()-20 +'px')

    $('#cloudTag').css('width' , item.getElementSizeX()-20 +'px')

    if(first == 'first'){
    }
    else{
        
        cloudTagOpts.height = item.getElementSizeY()-94
        if(classToSet == 'style1')
            cloudTagOpts.height=  item.getElementSizeY()-20
        cloudTagOpts.width = item.getElementSizeX()-20
        $('#cloudTag').jQCloud('destroy'); 

        $('#cloudTag').jQCloud(tagsCloud, cloudTagOpts);
  
    }

    
   	
        	item.$element.removeClass('style0 style1 style2 style3 style4 style5 style6 style7 style8 style9 style10 style11 style12 style13 style14 style15 smallFont extralargeFont mediumFont  largeFont')
        	.addClass(classToSet+ ' ' + classFont)
        	.addClass('tagcloudWidget')
    	
    }
    return {
      scope: {},
      replace: true,
      templateUrl: 'js/backoffice/categories/partials/tagCloudWidget.html',
      controller:function($scope,tagService,$state,$rootScope){
            
        $scope.cloudTagOpts = {
            steps: 10,
            autoResize:true,
            delay:100,
            // colors:['#00CCFF','#03C3FE','#06BAFD','#09B1FD','#0CA8FC','#0FA0FC','#1297FB','#158EFB','#1885FA','#1C7DFA'],
            // removeOverflowing:false,
            afterCloudRender:function(){
            }
        }
              
           
      },
      link:function(scope,element,attrs){
        $rootScope.$on('tagSelfChange',function(e,data){
                    var index = _.findIndex(scope.tagsCloud, function(o) { return o.myid == data.id; });
                    if( index !== -1) {

                        var dataUsable = {};
                            dataUsable.text = data.text
                            dataUsable.myid = data.id
                            dataUsable.html = {};
                            dataUsable.weight = data.total
                            dataUsable.html.title = data.total
                            dataUsable.html.class = 'CatInCloud'
                        
                        _.merge(scope.tagsCloud[index], dataUsable)
                        $('#cloudTag').jQCloud('update', scope.tagsCloud);

                    }
            })
        $sailsSocket.subscribe('tag',function(data){
                
                if(data.verb =='updated'){

                    var index = _.findIndex(scope.tagsCloud, function(o) { return o.myid == data.id; });
                    if( index !== -1) {

                        var dataUsable = {};
                        if(data.data.text)
                            dataUsable.text = data.data.text
                        if(data.data.id)
                            dataUsable.myid = data.data.id
                        dataUsable.html = {};
                        if(data.data.total){
                            dataUsable.weight = data.data.total
                            dataUsable.html.title = data.data.total
                        }
                        
                        dataUsable.html.class = 'CatInCloud'
                        _.merge(scope.tagsCloud[index], dataUsable)
                        $('#cloudTag').jQCloud('update', scope.tagsCloud);

                    }
                }                
                if(data.verb =='created'){

                    data = data.data

                    var dataUsable = {};
                        dataUsable.text = data.text
                        dataUsable.myid = data.id
                        dataUsable.html = {};
                        dataUsable.weight = data.total
                        dataUsable.html.title = data.total
                        dataUsable.html.class = 'CatInCloud'
                    
                    scope.tagsCloud.push(dataUsable)
                    $('#cloudTag').jQCloud('update', scope.tagsCloud);
                }              
                if(data.verb =='destroyed'){
                    var index = _.findIndex(scope.tagsCloud, function(o) { return o.myid == data.id; });
                    if( index !== -1) {
                        
                        scope.tagsCloud.splice(index,1)
                    }    

                        
                        
                    $('#cloudTag').jQCloud('update', scope.tagsCloud);
                }
               
        })
         

        tagService.fetchAll().then(function(data){

           data = _.map(data,function(c){

            return {'text':c.text,'myid':c.id,'weight':c.total,
                html:{
                  'title': c.total,
                  'class': 'TagInCloud',
                }
            }
            
          })

          
            scope.tagsCloud =data
            thisresize(scope.$parent.gridsterItem, 'first', scope.tagsCloud)
            $('#cloudTag').jQCloud(scope.tagsCloud, scope.cloudTagOpts);


          // scope.$applyAsync()
        }).catch(function(e){
        })
      	scope.$parent.$on('gridster-item-resized', function(e,item) {
            delete scope.tagsCloud['height']
            delete scope.tagsCloud['width']
            var tmp = scope.tagsCloud
      		thisresize(item,'null',tmp,scope.cloudTagOpts);


      		
		})
      	scope.$parent.$on('gridster-item-transition-end', function(e,item) {
      		
		})

      }
    };

});