$(document).ready(function(){



    var words = _.map(tags,function(o){
        return {text:o.text,weight:o.nbArticles,link:'blog/tags/'+o.id+'/'+o.text}
        
    })
    console.log('wordswordswordswordswordswordswordswordswordswordswordswordswords');
    console.log(words);
    $('#keywords').jQCloud(words,
    {
    	colors:['#89BE37','#85AF35','#82A033','#7E9231','#7B832F','#78742D','#74662B','#715729','#6E4927'],
  		height: 350
	});





	
})