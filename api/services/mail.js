var config = require('../../config/config');
var Promise = require("bluebird");
var nodemailer = require('nodemailer');

module.exports ={

   mainEmail: config.mainEmail,
   mainEmailPassword: config.mainEmailPassword,
   sendEmail:function(options,template){
      if(template!= null)
      {
         options.html = this.fetchTemplate(template);
      }else{
         return this.send(options).then(function(result) {
               return result;
         });
      }
   },
   send:function(options){
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: this.mainEmail,
              pass: this.mainEmailPassword
          }
      });
      return new Promise(function(resolve,reject){
         transporter.sendMail(options, function(error, info){
            if(error){
               reject(error)
            }else{
               resolve(info) 
            }
         });
      }) 
   },
   fetchTemplate:function(template){
      return new Promise(function(resolve,reject){
         sails.renderView('email/'+template, {layout:'emailLayout'}, function(error, html) {
            if(error){
               reject(error);
            }else{
               resolve(html);
            }
         });
      })
   }
};

