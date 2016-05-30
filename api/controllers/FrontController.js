var moment = require('moment')
var truncate = require('html-truncate');
/**
 * FrontController
 *
 * @description :: Server-side logic for managing fronts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home:function(req,res,next){
		req.locale = req.locale || 'en'
		moment.locale(req.locale);
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
	blog:function(req,res,next){
		req.locale = req.locale || 'en'
		moment.locale(req.locale);
		var page = 1;
		// nbperpage = 2;
		baseurl='/'
		if(req.params.page){
			baseurl='/../'
			page = req.params.page;
		}
		var result = {};

		var articlesPromise = Article.find({status:'actif'}).sort('date DESC')
	    .limit(10).populateAll();

		articlesPromise
	    .then(function(articles) {   
	        var articlesWithAuthorsPromises = articles.map(function(article) {
	            var authorsPromises = article.authors.map(function(author) {
	                return User.findOne(author.id).populateAll();
	            });

	            return Promise.all(authorsPromises)
	                  .then(function(fullfilledAuthors) {
	                  	  article = article.toObject()
	                      article.authors = fullfilledAuthors;
	                      article.content = truncate(article.content, 250)
	                      return article;
	                   })
	        })

	        return Promise.all(articlesWithAuthorsPromises)
	    })
	   .then(function(articles) {
	   		
	   		result.articles = articles
	   		
	   		return Article.find({status:'actif'}).sort('nbView DESC')
	    	.limit(5)



	    })
	   .then(function(mostseen) {
	   		
	   		result.mostseen = mostseen
	   		
	   		return Category.find({ nbArticles: { '!': 0 }}).sort('name ASC')



	    }).then(function(categories){

			result.categories = categories	    	

	    	res.status(200).view('front/blog',{
				articles:result.articles,
				title: req.__('SEO_BLOG_title'),
				keyword: req.__('SEO_BLOG_keyword'),
				description:req.__('SEO_BLOG_description'),
				scripturl:'portfo.js',
				menu:'blog',
				// nbPage:nbPage,
				thiscategory:null,
				mostseen:result.mostseen,
				categories:result.categories,
				moment: moment,
				baseurl:baseurl
			})
	    })
	    .catch(function(e){
	    	console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRROR');
	    	console.log(e);
	    })
		
			




	},
	categoryArticle:function(req,res,next){
		console.log('CATEGORY====>',req.params.thiscat);
		req.locale = req.locale || 'en'
		moment.locale(req.locale);
		var page = 1;
		// nbperpage = 2;
		baseurl='/'
		if(req.params.page){
			baseurl='/../'
			page = req.params.page;
		}
		var result = {};

		var articlesPromise = Article.find({status:'actif'})
		.sort('date DESC').limit(10).populateAll().where({categories:{'contains':req.params.thiscat}});

		

		articlesPromise
	    .then(function(articles) {   
	        var articlesWithAuthorsPromises = articles.map(function(article) {
	            var authorsPromises = article.authors.map(function(author) {
	                return User.findOne(author.id).populateAll();
	            });

	            return Promise.all(authorsPromises)
	                  .then(function(fullfilledAuthors) {
	                  	  article = article.toObject()
	                      article.authors = fullfilledAuthors;
	                      article.content = truncate(article.content, 250)
	                      return article;
	                   })
	        })

	        return Promise.all(articlesWithAuthorsPromises)
	    })
	   .then(function(articles) {
	   		
	   		result.articles = articles
	   		
	   		return Article.find({status:'actif'}).sort('nbView DESC')
	    	.limit(5)



	    })
	   .then(function(mostseen) {
	   		
	   		result.mostseen = mostseen
	   		
	   		return Category.find({ nbArticles: { '!': 0 }}).sort('name ASC')



	    }).then(function(categories){

			result.categories = categories	    	

	    	res.status(200).view('front/blog',{
				articles:result.articles,
				title: req.__('SEO_BLOG_title'),
				keyword: req.__('SEO_BLOG_keyword'),
				description:req.__('SEO_BLOG_description'),
				scripturl:'portfo.js',
				menu:'blog',
				// nbPage:nbPage,
				thiscategory:null,
				mostseen:result.mostseen,
				categories:result.categories,
				moment: moment,
				baseurl:baseurl
			})
	    })
	    .catch(function(e){
	    	console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRROR');
	    	console.log(e);
	    })
		
			




	},
	contact:function(req,res,next){
		req.locale = req.locale || 'en'
		moment.locale(req.locale);
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
			req.locale = req.locale || 'en'
			moment.locale(req.locale);
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

