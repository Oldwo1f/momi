/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs'), Writable = require('stream').Writable;
var IsThere = require("is-there");

module.exports = {
	
	serveDocument:function  (req,res,next) {
		var filePath = 'uploads/files/'+ req.params.name;
		// +req.params.size+'/'
		// sails.log(filePath);
	    var stat = fs.statSync(filePath);
	    // setTimeout(function (argument) {
	    	res.writeHead(200, {
		        // 'Content-Type': 'image/',
		        'Content-Length': stat.size
		    });

		    var readStream = fs.createReadStream(filePath);
		    readStream.pipe(res);
	    // },500)
	    
	},	
};

