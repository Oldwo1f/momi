/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchAutocomplete:function(req,res,next){


		es.client().search({
		  index: 'momi',
		  type: 'tag',
		  // id: value.id,
		  body: {
			    "query": {
			        "match_phrase_prefix" : { "text" :""+req.params.searchText }
			    }
			}
		}, function (error, response) {
            return res.send(response);
		});



	}
};

