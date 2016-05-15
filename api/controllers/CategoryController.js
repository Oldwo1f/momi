/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchAutocomplete:function(req,res,next){


		es.client().search({
		  index: 'momi',
		  type: 'category',
		  // id: value.id,
		  body: {
			    "query": {
			        "match_phrase_prefix" : { "name" :""+req.params.searchText }
			    }
			}
		}, function (error, response) {
            return res.send(response);
		});



	}
};

