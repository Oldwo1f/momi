var mailService = require ('../api/services/mail');
var social = require ('../api/services/social');

var Promise = require("bluebird"),
sinon = require('sinon'),
chai = require('chai'),
expect = chai.expect,
chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
require ('sinon-as-promised');

var url = "http://arbatou.fr";
var options ={
             from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address 
             to: 'alexismomcilovic@gmail.com', // list of receivers 
             subject: 'Hello ✔', // Subject line 
             text: 'Hello world 🐴', // plaintext body 
             html: '<b>Hello world 222 🐴</b>' // html body 
         };

describe.skip('TEST ALL THIRD PARTY ',function() {
 
	

	describe('#sendEmail',function() {
		it('should send the email into you box ',function(done){
			expect(mailService.sendEmail(options)).to.have.eventually.property('accepted').notify(done);
		});
	})

	describe('#SOCIAL COUNT APIs',function() {
		it('should return facebook shares',function(done){
			expect(social.getFacebookShare(url)).to.be.eventually.a('number').notify(done);
		});
		it('should return twitter count',function(done){
			expect(social.getTwitterCount(url)).to.be.eventually.a('number').notify(done);
		});
	})

});
