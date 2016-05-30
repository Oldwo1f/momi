angular.module('core')
.factory('articleService', ["$http", "$q", "$sailsSocket", "$state", "$auth", function ($http,$q,$sailsSocket,$state,$auth) {
    var service = {};
    service.items=[];  

    service.filter={slug:'',page:1,order:'createdAt DESC',perPage:10};

    service.fetch= function(sort,page,nbPerPage) {

        console.log('FETCH');
        var deferred = $q.defer();
        sort = sort? sort : 'date DESC'
        nbPerPage = nbPerPage ? nbPerPage : 3
        page = page ? page : 1;

        console.log('nbPerPage '+ nbPerPage);
        console.log('page '+ page);
        console.log('/article/'+sort+'/'+nbPerPage+'/'+nbPerPage*(page-1));
        $sailsSocket.get('/api/article/'+sort+'/'+nbPerPage+'/'+nbPerPage*(page-1)).success(function (data,status) {
            console.log(data);
            service.items =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            // if(status == '401')
            //     $state.go('login')

            deferred.reject(status);
        })

        return deferred.promise;
    };
    service.fetchLast= function() {
        var deferred = $q.defer();

        $sailsSocket.get('/api/articleActif/date DESC/1/1').success(function (data,status) {
            deferred.resolve(data[0]);
        }).error(function (data,status) {
            // if(status == '401')
            //     $state.go('login')
            deferred.reject(status);
        })

        return deferred.promise;
    };
    service.search= function(slug,sort) {
        var deferred = $q.defer();
        sort = sort? sort : 'date DESC'
       
        $sailsSocket.get('/api/article/search/'+sort+'/'+slug).success(function (data,status) {
            service.items =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            // if(status == '401')
            //     $state.go('login')
            deferred.reject(status);
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

        var deferred = $q.defer();
        if(imgID){
            $sailsSocket.delete('/api/article/'+id+'/images/'+imgID).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                    $state.go('login')
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }
    service.removeDocument=function(id,docID){

        var deferred = $q.defer();
        if(docID){
            $sailsSocket.delete('/api/article/'+id+'/documents/'+docID).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }


    service.addCategory=function(id,newCategory){

        var deferred = $q.defer();
        if(newCategory.id){
            $sailsSocket.post('/api/article/'+id+'/categories/'+newCategory.id).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }else{
            $sailsSocket.post('/api/article/'+id+'/categories/',newCategory).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }
        return deferred.promise;      
    }

    service.removeCategory=function(id,newCategory){

        var deferred = $q.defer();
        if(newCategory.id){
            // TAG dejà existant
            $sailsSocket.delete('/api/article/'+id+'/categories/'+newCategory.id).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }

    service.addAuthor=function(id,newAuthor){

        var deferred = $q.defer();
        if(newAuthor.id){
            $sailsSocket.post('/api/article/'+id+'/authors/'+newAuthor.id).success(function (data,status) {
                deferred.resolve({data:data, addedAuthorId: newAuthor.id});
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }else{
            $sailsSocket.post('/api/article/'+id+'/authors/',newAuthor).success(function (data,status) {
                deferred.resolve({data:data, addedAuthorId: newAuthor.id});
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }
        return deferred.promise;      
    }

    service.removeAuthor=function(id,newAuthor){

        var deferred = $q.defer();
        if(newAuthor.id){
            // TAG dejà existant
            $sailsSocket.delete('/api/article/'+id+'/authors/'+newAuthor.id).success(function (data,status) {
                deferred.resolve({data:data, removedAuthorId: newAuthor.id});
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
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
            $sailsSocket.post('/api/article/'+id+'/tags/'+newTag.id).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }else{
            // TAG à créer
            $sailsSocket.post('/api/article/'+id+'/tags/',newTag).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }

    service.removeTag=function(id,newTag){

        // var tag = {text : newTag};
        var deferred = $q.defer();
        if(newTag.id){
            // TAG dejà existant
            $sailsSocket.delete('/api/article/'+id+'/tags/'+newTag.id).success(function (data,status) {
                deferred.resolve(data);
            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })
        }
        
        return deferred.promise;      
    }

    service.createBlank=function(article){

        var authorId = $auth.getPayload().sub
        console.log(authorId);
        article = {date : new Date(),status:'draft'};
        var deferred = $q.defer();
        $sailsSocket.post('/api/article',article).success(function (data,status) {
            

            $sailsSocket.post('/api/article/'+data.id+'/authors/'+authorId).success(function (data2,status) {
                console.log('HEHEHEHEHHEHEHEHEHE');
                // console.log(data2);
                // if(typeof(data2.tags) != 'array')
                // data2.content='';
                // data2.tags=[];
                // deferred.resolve(data2);
                 $sailsSocket.get('/api/article/'+data.id).success(function (data3,status) {
                    console.log('HEHEHEHEHHEHEHEHEHE');
                    console.log(data3);
                    if(typeof(data3.tags) != 'array')
                    // data2.content='';
                    data3.tags=[];
                    deferred.resolve(data3);


                }).error(function (data,status) {
                    if(status == '401')
                    $state.go('login')
                    deferred.reject(data);
                })


            }).error(function (data,status) {
                if(status == '401')
                $state.go('login')
                deferred.reject(data);
            })


            // deferred.resolve(data);
        }).error(function (data,status) {
            if(status == '401')
                $state.go('login')
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.fetchOne=function(id){

        // article = {date : new Date(),status:'draft'};
        var deferred = $q.defer();
        $sailsSocket.get('/api/article/'+id).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            if(status == '401')
                $state.go('login')
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.update=function(id, values){

        var deferred = $q.defer();
        $sailsSocket.put('/api/article/'+id,values).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            // if(status == '401')
            //     $state.go('login')
            deferred.reject(data);
        })
        return deferred.promise;      
    }
    service.remove=function(id){

        var deferred = $q.defer();
        $sailsSocket.delete('/api/article/'+id).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            if(status == '401')
                $state.go('login')
            deferred.reject(data);
        })
        return deferred.promise;      
    }

    


    return service;
}]);