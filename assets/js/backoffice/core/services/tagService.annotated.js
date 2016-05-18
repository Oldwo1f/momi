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
    service.fetchAll= function(sort,page,nbPerPage) {
        var deferred = $q.defer();
        $sailsSocket.get('/tag?sort=createdAt DESC&limit=10000').success(function (data,status) {
            console.log('SUCCESSSUCCESSSUCCESSSUCCESSSUCCESS');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.fetch= function(sort,page,nbPerPage) {
        var deferred = $q.defer();
        sort = sort? sort : 'date DESC'
        nbPerPage = nbPerPage ? nbPerPage : 10
        page = page ? page : 1
        console.log('sort', sort);
        console.log('nbPerPage', nbPerPage);
        console.log('page', page);
        $sailsSocket.get('/tag/?sort='+sort+'&limit='+nbPerPage+'&skip='+nbPerPage*(page-1)).success(function (data,status) {
            console.log('SUCCESSSUCCESSSUCCESSSUCCESSSUCCESS');
            console.log(data);
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
     service.update=function(id, values){

        console.log('updateValue Service');
        console.log(id);
        console.log(values);
        var deferred = $q.defer();
        $sailsSocket.put('/tag/'+id,values).success(function (data,status) {
            console.log('SUCCESS');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log('serviceErr');
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.remove=function(id){

        console.log('remove Service');
        console.log(id);
        // console.log(values);
        var deferred = $q.defer();
        $sailsSocket.delete('/tag/'+id).success(function (data,status) {
            console.log('SUCCESS');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log('serviceErr');
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }

    // service.list = service.fetchTags();

	return service;
}])