/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs'), Writable = require('stream').Writable;
var sid = require('shortid');
var easyimg = require('easyimage');
var IsThere = require("is-there");
module.exports = {
	
	serveImage:function  (req,res,next) {
		var filePath = 'uploads/images/'+ req.params.size +'/'+ req.params.name;
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
	resizeImage:function  (req,res,next) {



		easyimg.info('uploads/images/originalSize/'+req.body.filename).then(function(file) {

		    	easyimg.rescrop({
		    		 gravity:'NorthWest',
				     src:'uploads/images/originalSize/'+req.body.filename, dst:'uploads/images/resized/'+req.body.filename,
				     width:file.width, height:file.height,
				     cropwidth:req.body.scaledWidth, cropheight:req.body.scaledHeight,
				     x:req.body.scaledLeft, y:req.body.scaledTop
				}).then(function(image) {
					res.ok('resized')
				},function (err) {
				    console.log(err);
				}
				);









		  	}, function (err) {
		    	console.log(err);
		  	}
		);


		

	},
};

