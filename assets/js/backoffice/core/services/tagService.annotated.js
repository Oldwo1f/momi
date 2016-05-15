angular.module('core').factory('tagService',["$compile", "$sailsSocket", "$q", "$http", function ($compile,$sailsSocket,$q,$http) {
	
	var service = {};
	

	



    service.fetchOne=function(id){

       
        var deferred = $q.defer();
        $sailsSocket.get('/tag/'+id).success(function (data,status) {
            console.log('SUCCESS');
            console.log(data);
            // service.list = data ;
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }

	service.fetchTags=function(){

       
        var deferred = $q.defer();
        $sailsSocket.get('/tag/').success(function (data,status) {
            console.log('SUCCESS');
            console.log(data);
            // service.list = data ;
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }
	service.searchTags=function(searchText){
		// console.log(searchText);
        var deferred = $q.defer();
        $sailsSocket.get('/tag/searchAutocomplete/'+searchText).success(function (data,status) {
            // console.log('SUCCESS search');
            // console.log(data);
            var resultArray =[];
            if(data.hits.total > 0){

            	for(var i in data.hits.hits){
            		resultArray.push(data.hits.hits[i]._source);
            	}
            }

            console.log(resultArray);
            // service.list = data ;
            deferred.resolve(resultArray);
        }).error(function (data,status) {
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }


    // service.list = service.fetchTags();

	return service;
}])