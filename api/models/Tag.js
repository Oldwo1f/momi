/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  	schema: true,
  	attributes: {
  		text:{type:'string',required:true},
  		nbDocuments:{type:'int',defaultsTo:0},
  		nbArticles:{type:'int',defaultsTo:0},
        nbProjects:{type:'int',defaultsTo:0},
  		total:{type:'int',defaultsTo:0},
        selfUpdate:function(options,cb){
        console.log('SELF UPDATE');
        console.log(options);

        if(options.parentType == 'article')
        {
            if(options.verb == 'add'){

                Tag.findOne(this.id).then(function(data){
                console.log(data);
                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<);");
                    data.nbArticles= Number(data.nbArticles)+1;
                    data.total= Number(data.total)+1;
                    console.log(data);
                    return Tag.update(data.id ,
                    {
                        nbArticles : data.nbArticles,
                        total : data.total
                    }).then(function(result){

                        Tag.publishUpdate( data.id , {
                                nbArticles : data.nbArticles,
                                total : data.total
                        } )
                        console.log('--------------');
                        console.log(result[0]);
                        cb(null,result[0]);
                        
                    })
                   
                }).catch(function (err) {
                    cb(err,null);
                });
            }
            // if(options.verb == 'create'){

            //     Tag.findOne(this.id).then(function(data){
            //         // console.log(data);
            //         data.nbArticles= Number(data.nbArticles)+1;
            //         data.total= Number(data.total)+1;
            //         // console.log(data);
            //         return Tag.update(data.id ,
            //         {
            //             nbArticles : data.nbArticles
            //         }).then(function(result){

            //             es.create('tag',result[0],options.parentId).then(function(e,d){
            //                 console.log('ES tag stored');
            //                 console.log(d);
            //                 console.log(result[0]);
            //                 return cb(null,result[0]);
            //             }).catch(function(err){
            //                    console.log(err);
            //             })


            //             // console.log('--------------');
            //             // console.log(result[0]);
            //             // cb(null,result[0]);
                        
            //         })
                   
            //     }).catch(function (err) {
            //         console.log('ERRORORORORORORORO');
            //         console.log(err);
            //         cb(err,null);
            //     });
            // }
            if(options.verb == 'remove'){

              Tag.findOne(this.id).then(function(data){
                    data.nbArticles= Number(data.nbArticles) -1;
                    data.total= Number(data.total) -1;
                    if(data.total<=0){
                     //&& data.nbArticles<=0 && data.nbArticles<=0 &&
                        return Tag.destroy(data.id).then(function(result){
                            cb(null,result[0]);
                            Tag.publishDestroy( data.id )
                        })
                    }else{
                        return Tag.update(data.id ,
                        {
                            nbArticles : data.nbArticles,
                            total : data.total
                        }).then(function(result){
                            Tag.publishUpdate( data.id , {
                                nbArticles : data.nbArticles,
                                total : data.total
                            } )
                            
                        })

                    }
                   
                }).catch(function (err) {
                    cb(err,null);
                });
            }
        }




        // cb();
      }
	},
    afterCreate: function (value, callback){
      console.log('afterCreate TAG');

        es.create('tag',value).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
 
    },
    afterUpdate: function (value, callback){
        console.log('after UPDATE TAG');

        es.update('tag',value).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
    },
    afterDestroy: function (value, callback){
        console.log('after destroy TAG');
        es.delete('tag',value[0]).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
    },
};


