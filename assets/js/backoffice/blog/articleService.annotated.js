angular.module('core')
.factory('articleService', ['$http', '$q','$sailsSocket', function ($http,$q,$sailsSocket) {
    var service = {};
    service.items=[];  

    service.filter={slug:'',page:1,order:'createdAt DESC',perPage:10};

    service.fetch= function(sort,page,nbPerPage) {
        var deferred = $q.defer();
        sort = sort? sort : 'date DESC'
        nbPerPage = nbPerPage ? nbPerPage : 3
        page = page ? page : 1
        console.log('sort', sort);
        console.log('nbPerPage', nbPerPage);
        console.log('page', page);
        // console.log(stateParams);
        // console.log(service.filter);
        $sailsSocket.get('/article?sort='+sort+'&limit='+nbPerPage+'&skip='+nbPerPage*(page-1)).success(function (data,status) {
            console.log(data);
            service.items =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };
    service.fetchLast= function() {
        var deferred = $q.defer();

        $sailsSocket.get('/article?sort=date DESC&limit=1&where={"status":"actif"}').success(function (data,status) {
            console.log(data);
            deferred.resolve(data[0]);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };
    service.search= function(slug,sort) {
        var deferred = $q.defer();
        sort = sort? sort : 'date DESC'
       
        // console.log(stateParams);
        // console.log(service.filter);
        $sailsSocket.get('/article/search/'+sort+'/'+slug).success(function (data,status) {
            console.log(data);
            service.items =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };


    // service.autocomplete= function(query) {
    //     var deferred = $q.defer();

    //     $http.get('/article/list/'+query).success(function (data,status) {
    //         // service.items=data
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };

    // service.fetch= function(id) {
    //     var deferred = $q.defer();

    //     $http.get('/article/'+id).success(function (data,status) {
    //         service.items=data
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };

    // service.loadGraph= function(mode) {
    //     var deferred = $q.defer();
    //     // var period= 'month';
    //     $http.get('/article/graph/'+mode).success(function (data,status) {
    //         console.log('resolveGRAPH');
    //         console.log(data);
    //         deferred.resolve(data);
    //     // }).error(function (data,status) {
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };
    // service.loadGraph2= function(mode) {
    //     var deferred = $q.defer();
    //     // var period= 'month';
    //     $http.get('/article/graph2/'+mode).success(function (data,status) {
    //         console.log('resolveGRAPH');
    //         console.log(data);
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };
    

    service.removeImage=function(id,imgID){

        console.log('REMOVE Image Service');
        var deferred = $q.defer();
        console.log(id);
        console.log(imgID);
        if(imgID){
            $sailsSocket.delete('/article/'+id+'/images/'+imgID).success(function (data,status) {
                console.log('SUCCESS');
                console.log(data);
                deferred.resolve(data);
            }).error(function (data,status) {
                console.log(data);
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }
    service.removeDocument=function(id,docID){

        console.log('REMOVE DOCUMENT Service');
        var deferred = $q.defer();
        console.log(id);
        console.log(docID);
        if(docID){
            $sailsSocket.delete('/article/'+id+'/documents/'+docID).success(function (data,status) {
                console.log('SUCCESS');
                console.log(data);
                deferred.resolve(data);
            }).error(function (data,status) {
                console.log(data);
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }


    service.addCategory=function(id,newCategory){

        var deferred = $q.defer();
        if(newCategory.id){
            $sailsSocket.post('/article/'+id+'/categories/'+newCategory.id).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                deferred.reject(data);
            })
        }else{
            $sailsSocket.post('/article/'+id+'/categories/',newCategory).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                deferred.reject(data);
            })
        }
        return deferred.promise;      
    }

    service.removeCategory=function(id,newCategory){

        console.log('REMOVE TAG Service');
        // var category = {text : newCategory};
        var deferred = $q.defer();
        console.log(id);
        console.log(newCategory);
        if(newCategory.id){
            // TAG dejà existant
            $sailsSocket.delete('/article/'+id+'/categories/'+newCategory.id).success(function (data,status) {
                console.log('SUCCESS');
                console.log(data);
                deferred.resolve(data);
            }).error(function (data,status) {
                console.log(data);
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }
    service.addTag=function(id,newTag){

        // var tag = {text : newTag};
        var deferred = $q.defer();
        if(newTag.id){
            // TAG dejà existant
            $sailsSocket.post('/article/'+id+'/tags/'+newTag.id).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                deferred.reject(data);
            })
        }else{
            // TAG à créer
            $sailsSocket.post('/article/'+id+'/tags/',newTag).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }

    service.removeTag=function(id,newTag){

        console.log('REMOVE TAG Service');
        // var tag = {text : newTag};
        var deferred = $q.defer();
        console.log(id);
        console.log(newTag);
        if(newTag.id){
            // TAG dejà existant
            $sailsSocket.delete('/article/'+id+'/tags/'+newTag.id).success(function (data,status) {
                console.log('SUCCESS');
                console.log(data);
                deferred.resolve(data);
            }).error(function (data,status) {
                console.log(data);
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }

    service.createBlank=function(article){

        console.log('ADDNEW Service');
        article = {date : new Date(),status:'draft'};
        var deferred = $q.defer();
        $sailsSocket.post('/article',article).success(function (data,status) {
            console.log('SUCCESS');
            console.log(typeof(data.tags));
            if(typeof(data.tags) != 'array')
                data.tags=[];
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.fetchOne=function(id){

        console.log('fetchOne Article');
        console.log(id);
        // article = {date : new Date(),status:'draft'};
        var deferred = $q.defer();
        $sailsSocket.get('/article/'+id).success(function (data,status) {
            console.log('SUCCESS');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            console.log('ERROR');
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
        $sailsSocket.put('/article/'+id,values).success(function (data,status) {
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
        $sailsSocket.delete('/article/'+id).success(function (data,status) {
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

    


    return service;
}]);