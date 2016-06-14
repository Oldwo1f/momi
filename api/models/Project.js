/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Promise = require('bluebird');

module.exports = {
	schema: true,
    attributes: {
  		lang : {type:'string',defaultsTo:'fr'},
  		title : {type:'string'},
    	content : {type:'text',defaultsTo:''},
    	shortcontent : {type:'text',defaultsTo:null},
    	description : {type:'text',defaultTso:null},
    	rewriteurl : {type:'string',defaultsTo:null},
    	keyword : {type:'string',defaultsTo:null},
  		date : {type:'datetime',required:true},
  		nbView : {type:'integer',defaultsTo:0},
  		status : {type:'string',required:true},
        activeComent:{type:'boolean',defaultsTo:false},
        privateContent:{type:'boolean',defaultsTo:false},
        videoUrl:{type:'text',defaultsTo:null},
        videoHost:{type:'text',defaultsTo:null},
        categories:{collection:'category', via: 'projects',dominant:true},

        // categorie: {collection: 'categoryArticle',defaultsTo:[]},
        tags:{collection:'tag', via: 'projects',dominant:true},
        documents:{collection:'document',defaultsTo:[]},
        images:{collection:'image',defaultsTo:[]},
  		authors:{collection:'user',defaultsTo:[]},
        comments: {
          collection: 'comment',
          via:'project'
        },
    //     author: {
    // 			model: 'user'
    // 		},
    //     images: {
    //         collection: 'imageproject',
    //         via:'project'
    //     },
    //     documents: {
    //         collection: 'documentproject',
    //         via:'project'
    //     },
    //     comments: {
    //       collection: 'comment',
    //       via:'project'
    //     },
    //     translations: {
    //       collection: 'projecttraduction',
    //       via:'project'
    //     }
    },
    // afterCreate: function (value, callback){
    // 	console.log('afterCreate');

    //     es.create('project',value).then(function(){
    //         return callback()
    //     }).catch(function(err){
    //            console.log(err);
    //     })
 
    // },
    // afterUpdate: function (value, callback){
    //     // console.log('after UPDATE');
    //     // console.log(value);
    //     // Article.findOne(value.id).populate('tags').then(function(data){

    //     //     console.log('FOUND');
    //     //     console.log(data);

    //     //     return 
    //     // }).then(function(){
    //     //     return callback()
    //     // }).catch(function(err){
    //     //     console.log('error');
    //     // })

    //     es.update('project',value).then(function(){
    //         return callback()
    //     }).catch(function(err){
    //            console.log(err);
    //     })
    // },
    afterDestroy: function (value, callback){
        console.log('AFTER ARTICLE DESTROY');
        console.log(value);
        es.delete('project',value[0]).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
    },
};


