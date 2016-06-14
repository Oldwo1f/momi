angular.module('core').factory('widgetService',function ($compile,$http,userService,$auth) {
	
	var service = {};
	service.list = {};
	// service.defaultList = {
	// titleDashWidget : { enabled : true, required : false, widgetName :'titleDashWidget',html: '<title-dash-widget></title-dash-widget>',sizeX: 4, sizeY: 2 , minSizeY:1,maxSizeY :24,minSizeX:1 , maxSizeX : 24, col:0 ,row: 0,noresize:false,transparent: false },
	// menuWidget : { enabled : true, required : false, widgetName :'menuWidget',html: '<menu-widget></menu-widget>',sizeX: 4, sizeY: 6 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:0 ,row: 2,noresize:false,transparent: false },
	// dashboardconfigWidget : { enabled : true, required : true, widgetName :'dashboardconfigWidget',html: '<dashboardconfig-widget></dashboardconfig-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:6 ,row: 2,noresize:false,transparent: false },
	// lastarticleWidget : { enabled : true, required : false, widgetName :'lastarticleWidget',html: '<lastarticle-widget></lastarticle-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false },
	// categorycloudWidget : { enabled : true, required : false, widgetName :'categorycloudWidget',html: '<categorycloud-widget></categorycloud-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false},
	// tagcloudWidget : { enabled : true, required : false, widgetName :'tagcloudWidget',html: '<tagcloud-widget></tagcloud-widget>',sizeX: 8, sizeY: 1 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false},
	// profileWidget : { enabled : true, required : true, widgetName :'profileWidget',html: '<profile-widget></profile-widget>',sizeX: 6, sizeY: 4 , minSizeY:1,maxSizeY :12,minSizeX:1 , maxSizeX : 24, col:8 ,row: 8,noresize:false,transparent: false},
	// };

	service.defaultList = {
		"titleDashWidget":{"publicName":"Titre dashboard","enabled":true,"required":false,"widgetName":"titleDashWidget","html":"<title-dash-widget></title-dash-widget>","sizeX":4,"sizeY":2,"minSizeY":1,"maxSizeY":24,"minSizeX":1,"maxSizeX":24,"col":0,"row":0,"noresize":false,"transparent":false},
		"menuWidget":{"publicName":"Menu","enabled":true,"required":false,"widgetName":"menuWidget","html":"<menu-widget></menu-widget>","sizeX":4,"sizeY":6,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":0,"row":2,"noresize":false,"transparent":false},
		"dashboardconfigWidget":{"publicName":"Config","enabled":true,"required":true,"widgetName":"dashboardconfigWidget","html":"<dashboardconfig-widget></dashboardconfig-widget>","sizeX":8,"sizeY":1,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":11,"row":5,"noresize":false,"transparent":false},
		"lastarticleWidget":{"publicName":"Dernier article","enabled":true,"required":false,"widgetName":"lastarticleWidget","html":"<lastarticle-widget></lastarticle-widget>","sizeX":7,"sizeY":5,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":12,"row":0,"noresize":false,"transparent":false},
		"lastprojectWidget":{"publicName":"Dernier projet","enabled":true,"required":false,"widgetName":"lastprojectWidget","html":"<lastproject-widget></lastproject-widget>","sizeX":7,"sizeY":5,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":12,"row":0,"noresize":false,"transparent":false},
		"categorycloudWidget":{"publicName":"Categories cloud","enabled":true,"required":false,"widgetName":"categorycloudWidget","html":"<categorycloud-widget></categorycloud-widget>","sizeX":8,"sizeY":2,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":4,"row":2,"noresize":false,"transparent":false},
		"tagcloudWidget":{"publicName":"Tags cloud","enabled":true,"required":false,"widgetName":"tagcloudWidget","html":"<tagcloud-widget></tagcloud-widget>","sizeX":8,"sizeY":2,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":4,"row":0,"noresize":false,"transparent":false},
		"profileWidget":{"publicName":"Profile","enabled":true,"required":true,"widgetName":"profileWidget","html":"<profile-widget></profile-widget>","sizeX":5,"sizeY":5,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":19,"row":0,"noresize":false,"transparent":false},
		"notificationWidget":{"publicName":"Notification","enabled":true,"required":false,"widgetName":"notificationWidget","html":"<notification-widget></notification-widget>","sizeX":5,"sizeY":5,"minSizeY":1,"maxSizeY":12,"minSizeX":1,"maxSizeX":24,"col":19,"row":0,"noresize":false,"transparent":false},
	}



	service.changeDash=function(theme){

		console.log('changeDash');
		console.log($auth.getPayload().sub);
		console.log(theme);
		
		userService.update($auth.getPayload().sub,{dashboard:service.list,theme:theme}).then(function(data){
			console.log('saved!!!!');
		}).catch(function(errr){
			console.log(errr);
			
		})
		
	}
	service.restoreDash=function(){

		console.log('restoreDash');
		return userService.selfProfile().then(function(data){
			console.log(data);

			if(data.dashboard)
			{
				service.list = data.dashboard;
			}else{
				console.log('ELSE');
		    	service.list = service.defaultList;
			}

			return service.list;


		}).catch(function(err){

			console.log(err);
			
		})
// 		$http({
// 		  data: service.list, 
// 		  method: 'get',
// 		  url: '/restoreDash'
// 		}).then(function successCallback(response) {



// 			// if(response.data.length>0)
// 			// {
// 			// 	console.log('true');
// // 
// 				// service.list = service.defaultList
// 				// return service.defaultList
// 				service.list = response.data;
// 				return service.list;
// 		  }, function errorCallback(response) {
// 		    // called asynchronously if an error occurs
// 		    // or server returns response with an error status.
		  //   	service.list = service.defaultList;
				// return service.list;
// 		  });
		
	}



	// service.restoreDash();






	return service;
})