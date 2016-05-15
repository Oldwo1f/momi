angular.module('core').factory('documentService',function ($compile,$sailsSocket,$q,$http) {
	
	var service = {};
	
    service.fetchOne=function(id){

       
        var deferred = $q.defer();
        $sailsSocket.get('/document/'+id).success(function (data,status) {
            console.log('SUCCESS');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log(data);
            deferred.reject(data);
        })
        return deferred.promise;      
    }


    // service.saveIndex=function(images){

    //     console.log('saveIndex');
    //     console.log(images);

    //     var deferred = $q.defer();
    //     var promises = [];

    //     // angular.forEach(images , function(image,i) {

    //     //     console.log(i);
    //     //     console.log(image.id);
    //     //     console.log(image.name);

    //     //     var promise = $http.put('image/'+image.id,{ rank : i });

    //     //     promises.push(promise);

    //     // });

    //     // return $q.all(promises);
    //     for(var i =0; i < images.length ; i++)
    //     {
    //         console.log('i' + i);
    //         console.log(images[i].name);

    //         promises.push($http.put('image/'+images[i].id,{ rank : i }))
    //     }
    //     // var promises = images.map(function(image, i ) {

    //     //     console.log(i + ' - ' + image.name);

    //     //     return $http.put('image/'+image.id,{ rank : i });

    //     // });

    //     return $q.all(promises);


    //     // $sailsSocket.get('/image/searchAutocomplete/'+searchText).success(function (data,status) {
    //     //     var resultArray =[];
    //     //     if(data.hits.total > 0){
    //     //      for(var i in data.hits.hits){
    //     //          resultArray.push(data.hits.hits[i]._source);
    //     //      }
    //     //     }
    //     //     console.log(resultArray);
    //     //     deferred.resolve(resultArray);
    //     // }).error(function (data,status) {
    //     //     console.log(data);
    //     //     deferred.reject(data);
    //     // })
    //     // return deferred.promise; 
        
    // }
    // service.saveImage=function(id,values){

    //     console.log('saveIndex');
    //     console.log(id);
    //     console.log(values);

    //     var deferred = $q.defer();
    //     var promises = [];

    //     $sailsSocket.put('/image/'+id,values).success(function (data,status) {
    //         console.log('SUCCESS');
    //         console.log(data);
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         console.log('serviceErr');
    //         console.log(data);
    //         deferred.reject(data);
    //     })
        
    //     return deferred.promise; 
        
    // }

	return service;
});