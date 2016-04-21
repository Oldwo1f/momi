var mailService = require ('../../../api/services/mail');

var Promise = require("bluebird"),
sinon = require('sinon'),
chai = require('chai'),
expect = chai.expect,
chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
require ('sinon-as-promised');


var options ={
             from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address 
             to: 'contact@momcreation.fr', // list of receivers 
             subject: 'Hello ✔', // Subject line 
             text: 'Hello world 🐴', // plaintext body 
             html: '<b>Hello world 🐴</b>' // html body 
         };

describe('MailService',function() {
 
	
	it('should have mainEmail property',function() {
		expect(mailService).to.have.property('mainEmail')
	})
	it('should have mainEmailPassword property',function() {
		expect(mailService).to.have.property('mainEmailPassword')
	})
	 

	describe('#sendEmail',function() {
		it('should be a function',function(){
			expect(mailService.sendEmail).to.be.a('function') 
		});

		it('should call a method send',function(){
			 sinon.spy(mailService,'send');
			 mailService.send(options)
			 // expect(mailService.send.withArgs(mailService.twitter_url + url).calledOnce).to.be.equal(true, 'wrong argument')
			 expect(mailService.send.calledOnce).to.be.equal(true, 'you must send() method')
			 mailService.send.restore();
		});

		it('should send the email',function(done){

			var stub = sinon.stub(mailService,'send');
			stub.resolves({'accepted':3});

			expect(mailService.sendEmail(options)).to.have.eventually.property('accepted').notify(done);
		});

	})

	describe('#fetchTemplate',function() {
		it('should be a function',function(){
			expect(mailService.fetchTemplate).to.be.a('function') 
		});

		it('should return an html template',function(done){
			var template = 'confirm';
			 expect(mailService.fetchTemplate(template)).to.be.eventually.a('string').notify(done)
		});
	})

});
