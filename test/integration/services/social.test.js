var social = require ('../../../api/services/social');
var Promise = require("bluebird");
var sinon = require('sinon'),
chai = require('chai'),
expect = chai.expect,
chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require ('sinon-as-promised');
describe('socialService',function() {
 
	var url = "http://arbatou.fr";
	
	it('should have property twitter_url',function() {
		expect(social).to.have.property('twitter_url')
	})
	it('should have property facebook_url',function() {
		expect(social).to.have.property('facebook_url')
	})

	describe('#getTwitterCount',function() {
		it('should be a function',function(){
			expect(social.getTwitterCount).to.be.a('function') 
		});

		it('should call a method callAPI',function(){
			 sinon.spy(social,'callAPI');
			 social.getTwitterCount(url)
			 expect(social.callAPI.withArgs(social.twitter_url + url).calledOnce).to.be.equal(true, 'wrong argument')
			 expect(social.callAPI.calledOnce).to.be.equal(true, 'you must call api')
			 social.callAPI.restore();
		});

		it('should return count',function(done){
			var stub = sinon.stub(social,'callAPI');
			 stub.resolves({count:3});

			expect(social.getTwitterCount(url)).to.be.eventually.equal(3).notify(done);
			social.callAPI.restore();
		});
	})

	describe('#getFacebookShare',function() {
		it('should be a function',function(){
			expect(social.getFacebookShare).to.be.a('function') 
		});

		it('should call a method callAPI',function(){
			 sinon.spy(social,'callAPI');
			 social.getFacebookShare(url)
			 expect(social.callAPI.withArgs(social.facebook_url + url).calledOnce).to.be.equal(true, 'wrong argument')
			 expect(social.callAPI.calledOnce).to.be.equal(true, 'you must call api')
			 social.callAPI.restore();
		});

		it('should return shares',function(done){
			var stub = sinon.stub(social,'callAPI');
			 stub.resolves({shares:3});

			expect(social.getFacebookShare(url)).to.be.eventually.equal(3).notify(done);
			social.callAPI.restore();
		});
	})

});