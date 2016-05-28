/**
 * FrontController
 *
 * @description :: Server-side logic for managing fronts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home:function(req,res,next){

		console.log('TOTOTOTOTOTOTOTOTOTOTOTOOTOTOTOTOTO');
		res.status(200).view('front/index',{
						// articles:articles,
						title: req.__('SEO_HOME_title'),
						keyword: req.__('SEO_HOME_keyword'),
						description:req.__('SEO_HOME_description'),
						scripturl:'script.js',
						menu:'home',
						baseurl:'',

					})
	},
	contact:function(req,res,next){

		console.log('TOTOTOTOTOTOTOTOTOTOTOTOOTOTOTOTOTO');
		res.status(200).view('front/contact',{
						title: req.__('SEO_CONTACT_title'),
						keyword: req.__('SEO_CONTACT_keyword'),
						description:req.__('SEO_CONTACT_description'),
						scripturl:'portfo.js',
						menu:'contact',
						baseurl:''

					})
	},	
	presta:function(req,res) {
			return res.view('front/presta',{
				menu:'presta',
				scripturl:'portfo.js',
				baseurl:'',
				title:req.__('SEO_PRESTA_title'),
				keyword:req.__('SEO_PRESTA_KEYWORD'),
				description:req.__('SEO_PRESTA_DESCRIPTION')
			});
	},
};

