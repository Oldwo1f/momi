/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
  		role: {type:'string',required:true},
	    civ: {type:'string',required:true},
	    name: {type:'string',required:true},
	    pseudo: {type:'string',unique:true,required:true},
	    email: {type:'string',required:true,unique:true,email:true},
	    phone: {type:'string',required:true},
	    company: {type:'string',required:true},
	    fonction: {type:'string'},
	    usename: {type:'boolean',required:true},
	    publishEmail: {type:'boolean',required:true},
	    publishPhone: {type:'boolean',required:true},
	    password:{type:'string',required:true},
	    changepasswordcomfirm : {type:'string'},
	    dateMember : {type:'date'},
	    lastActivity : {type:'date'},
	    image: {
            
        },
  }
};

