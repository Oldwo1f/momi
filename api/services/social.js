var request = require('request');
module.exports ={

   twitter_url: 'http://opensharecount.com/count.json?url=',
   facebook_url : 'http://graph.facebook.com/?id=',
   getTwitterCount :function(url) {
      return this.callAPI(this.twitter_url + url).then(function(data) {
            return data.count
          });
   },
   getFacebookShare :function(url) {
      return this.callAPI(this.facebook_url + url).then(function(data) {
            return data.shares
      });
   },
   callAPI :function(url) {
      return new Promise(function(resolve,reject){
         request(url,function(error,response,body) {
            if (!error && response.statusCode == 200) {
               resolve(JSON.parse(body))
            }else{
               reject(error)
            }
         })
      })
   },
};
