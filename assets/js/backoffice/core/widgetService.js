angular.module('core').factory('widgetService',function ($compile,$http) {
	
	var service = {};
	service.list = {};
	service.defaultList = {
	titleDashWidget : { enabled : true, required : false, widgetName :'titleDashWidget',html: '<title-dash-widget></title-dash-widget>',sizeX: 4, sizeY: 2 , minSizeY:1,maxSizeY :24,minSizeX:1 , maxSizeX : 24, col:0 ,row: 0,noresize:false,transparent: false },
	menuWidget : { enabled : true, required : false, widgetName :'menuWidget',html: '<menu-widget></menu-widget>',sizeX: 4, sizeY: 6 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:0 ,row: 2,noresize:false,transparent: false },
	dashboardconfigWidget : { enabled : true, required : true, widgetName :'dashboardconfigWidget',html: '<dashboardconfig-widget></dashboardconfig-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:6 ,row: 2,noresize:false,transparent: false },
	lastarticleWidget : { enabled : true, required : false, widgetName :'lastarticleWidget',html: '<lastarticle-widget></lastarticle-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false },
	categorycloudWidget : { enabled : true, required : false, widgetName :'categorycloudWidget',html: '<categorycloud-widget></categorycloud-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false},
	tagcloudWidget : { enabled : true, required : false, widgetName :'tagcloudWidget',html: '<tagcloud-widget></tagcloud-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false},
	profileWidget : { enabled : true, required : true, widgetName :'profileWidget',html: '<profile-widget></profile-widget>',sizeX: 6, sizeY: 4 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false},
	};

	



	service.changeDash=function(){

		// console.log('changeDash');
		// console.log();
		
		$http({
		  data: service.list,
		  method: 'POST',
		  url: '/saveDash'
		}).then(function successCallback(response) {

			console.log('SAVED !');
			// console.log(response);
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		
	}
	service.restoreDash=function(){

		// console.log('restoreDash');
		$http({
		  data: service.list, 
		  method: 'get',
		  url: '/restoreDash'
		}).then(function successCallback(response) {



			// if(response.data.length>0)
			// {
			// 	console.log('true');
// 
				// service.list = service.defaultList
				// return service.defaultList
				service.list = response.data;
				return service.list;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    	service.list = service.defaultList;
				return service.list;
		  });
		
	}



	// service.restoreDash();






	return service;
})