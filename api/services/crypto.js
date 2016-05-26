var crypto = require('crypto'),
    algorithm = 'sha1',
    Promise = require("bluebird");


module.exports ={

	encrypt : function(password){
		var hash = crypto
        .createHmac("md5",sails.config.secret)
        .update(password)
        .digest('hex');

        return hash;
	}
   	
};

 