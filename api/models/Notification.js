/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		type: {type:'string',required:true},
      	status: {type:'string',required:true},
        itemid: {type:'string'},
      	itemid2: {type:'string'},
      	info1: {type:'string'},
  		info2: {type:'string'},
  		forwho: {type:'string',required:true,defaultsTo:'admin'},
	    users:{
            collection: 'user'
        }
  }
};

