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
        activeComent:{type:'boolean',defaultsTo:true},
        videoUrl:{type:'text',defaultsTo:null},
        videoHost:{type:'text',defaultsTo:null},

        // categorie: {collection: 'categoryArticle',defaultsTo:[]},
        tags:{collection:'tag',defaultsTo:[]},
        categories:{collection:'category',defaultsTo:[]},
        documents:{collection:'document',defaultsTo:[]},
  		images:{collection:'image',defaultsTo:[]},
    //     author: {
    // 			model: 'user'
    // 		},
    //     images: {
    //         collection: 'imagearticle',
    //         via:'article'
    //     },
    //     documents: {
    //         collection: 'documentarticle',
    //         via:'article'
    //     },
    //     comments: {
    //       collection: 'comment',
    //       via:'article'
    //     },
    //     translations: {
    //       collection: 'articletraduction',
    //       via:'article'
    //     }
    },
    // afterCreate: function (value, callback){
    // 	console.log('afterCreate');

    //     es.create('article',value).then(function(){
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

    //     es.update('article',value).then(function(){
    //         return callback()
    //     }).catch(function(err){
    //            console.log(err);
    //     })
    // },
    afterDestroy: function (value, callback){
        console.log('AFTER ARTICLE DESTROY');
        console.log(value);
        es.delete('article',value[0]).then(function(){
            return callback()
        }).catch(function(err){
               console.log(err);
        })
    },
};

