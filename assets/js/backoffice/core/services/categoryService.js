angular.module('core').factory('categoryService',function ($compile,$sailsSocket,$q,$http,$state) {
	
	var service = {};
	

    service.fetchOne=function(id){

       
        var deferred = $q.defer();
        $sailsSocket.get('/category/'+id).success(function (data,status) {
            // service.list = data ;
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
        $sailsSocket.get('/category/?sort='+sort+'&limit='+nbPerPage+'&skip='+nbPerPage*(page-1)).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.fetchAll= function(sort,page,nbPerPage) {
        var deferred = $q.defer();
        $sailsSocket.get('/category?sort=createdAt DESC&limit=10000').success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.removeImage=function(id,imgID){

        var deferred = $q.defer();
        if(imgID){
            $sailsSocket.delete('/category/'+id+'/images/'+imgID).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
            
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }
	// service.fetchCategories=function(orded){
 //        var deferred = $q.defer();
 //        $sailsSocket.get('/category/').success(function (data,status) {
 //            console.log('SUCCESS');
 //            console.log(data);
 //            deferred.resolve(data);
 //        }).error(function (data,status) {
 //            console.log(data);
 //            deferred.reject(data);
 //        })
 //        return deferred.promise;      
 //    }
	service.searchCategories=function(searchText){
        var deferred = $q.defer();
        $sailsSocket.get('/category/searchAutocomplete/'+searchText).success(function (data,status) {
            var resultArray =[];
            if(data.hits.total > 0){
            	for(var i in data.hits.hits){
            		resultArray.push(data.hits.hits[i]._source);
            	}
            }
            deferred.resolve(resultArray);
        }).error(function (data,status) {
            
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }

     service.update=function(id, values){

        var deferred = $q.defer();
        $sailsSocket.put('/category/'+id,values).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.remove=function(id){

        var deferred = $q.defer();
        $sailsSocket.delete('/category/'+id).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            
            deferred.reject(data);
        })
        return deferred.promise;      
    }


	return service;
});