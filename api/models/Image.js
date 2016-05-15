/**
 * Image.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Promise = require('bluebird');
var fs = require('fs'), Writable = require('stream').Writable;
module.exports = {

  	schema: true,
  	attributes: {
  		filename:{type:'string',required:true},
  		name:{type:'string',required:true},
  		alt:{type:'text',defaultsTo:''},
  		rank:{type:'int'},
  		size:{type:'int'},
  		type:{type:'string'},
        selfUpdate:function(options,cb,res){
        console.log('SELF UPDATE');
        console.log(options);
        var childID = this.id
        if(options.parentType == 'article')
        {

        	//find article
        	Article.findOne(options.parentId).populate('images').then(function(article){
        		
        		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        		console.log(article);


        		if(options.verb == 'add'){
            		console.log('IMG ADD');
            		console.log(this.id);

	               Image.findOne(childID).then(function(data){
	               	console.log(data);
	                    
	                    return Image.update(data.id ,
	                    {
	                        // nbArticles : data.nbArticles,
	                        rank : article.images.length
	                    }).then(function(result){
	                        console.log(result[0]);
	                        cb(null,data);
	                        
	                    })
	                   
	                }).catch(function (err) {
	                    cb(err,null);
	                });
	            }
	  
	            if(options.verb == 'remove'){
	            	console.log('IMG REMOVE');

	            	return Promise.bind({})
	            	.then(function(){
	            		return Image.findOne(childID)
	            	})
	            	.then(function(data){
	            		this.imgToremove = data
	                    return Promise.map(article.images,function(img){
	                    	if(img.rank > data.rank)
	                    	{
	                    		console.log('IFFFFFF');
	                    		Image.findOne(img.id).then(function(data1){
				                    return Image.update(data1.id ,
				                    {
				                        rank : data1.rank-1
				                    }).then(function(result){
				                        // cb(null,data);
				                        return
				                    })
				                   
				                })

	                    	}
	                    	else{
	                    		return;
	                    	} 
	                    		
	                    })
	                   
	                }).then(function(){
	                	console.log('imgToREmove');
	                	
	                	// if()
	                	return Image.destroy(this.imgToremove.id).then(function(data){
                            cb(null,data);
		                })


	                	// return data.images.map
	                }).catch(function (err) {
	                    cb(err,null);
	                });

	            }	










        	}).catch(function(err){
        		console.log(err);
        	})
            
        }
      }
	},
    afterCreate: function (value, callback){
      console.log('afterCreate IMG');

        es.create('image',value).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
 
    },
    afterUpdate: function (value, callback){
        console.log('after UPDATE IMG');

        es.update('image',value).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
    },
    afterDestroy: function (value, callback){
        console.log('after destroy IMG');
        console.log(value);
        try{
	        fs.unlink('uploads/images/originalSize/'+value[0].filename)
	    }catch(e){

	    }try{
	        fs.unlink('uploads/images/adminThumbs/'+value[0].filename)
	    }catch(e){

	    }try{
	        fs.unlink('uploads/images/resized/'+value[0].filename)
	    }catch(e){

	    }



        es.delete('image',value[0]).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
    },
};