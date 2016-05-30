angular.module('core').factory('tagService',["$compile", "$sailsSocket", "$q", "$http", "$state", function ($compile,$sailsSocket,$q,$http,$state) {
	
	var service = {};
	

	



    service.fetchOne=function(id){

       
        var deferred = $q.defer();
        $sailsSocket.get('/api/tag/'+id).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.fetchAll= function(sort,page,nbPerPage) {
        var deferred = $q.defer();
        $sailsSocket.get('/api/tag?sort=createdAt DESC&limit=10000').success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.fetch= function(sort,page,nbPerPage) {
        var deferred = $q.defer();
        sort = sort? sort : 'date DESC'
        nbPerPage = nbPerPage ? nbPerPage : 10
        page = page ? page : 1
        $sailsSocket.get('/api/tag/?sort='+sort+'&limit='+nbPerPage+'&skip='+nbPerPage*(page-1)).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }

	service.fetchTags=function(){

       
        var deferred = $q.defer();
        $sailsSocket.get('/api/tag/').success(function (data,status) {
            // service.list = data ;
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }
	service.searchTags=function(searchText){
        var deferred = $q.defer();
        $sailsSocket.get('/api/tag/searchAutocomplete/'+searchText).success(function (data,status) {
            var resultArray =[];
            if(data.hits.total > 0){

            	for(var i in data.hits.hits){
            		resultArray.push(data.hits.hits[i]._source);
            	}
            }

            // service.list = data ;
            deferred.resolve(resultArray);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }
     service.update=function(id, values){

        var deferred = $q.defer();
        $sailsSocket.put('/api/tag/'+id,values).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.remove=function(id){

        var deferred = $q.defer();
        $sailsSocket.delete('/api/tag/'+id).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }

    // service.list = service.fetchTags();

	return service;
}])