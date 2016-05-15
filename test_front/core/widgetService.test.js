describe('widgetService',function(){

	var widgetService, $q, $http;

	beforeEach(function(){
		angular.mock.module('core')
		angular.mock.inject(function(_$q_,_widgetService_,_$http_){
			widgetService = _widgetService_;
			$q=$q;
			$http=_$http_
		})
	})
	afterEach(function(){
		// $http.verifyNoOutstandingExpectation();
		// $http.verifyNoOutstandingRequest();
	})

	it('should have List Property that is an object',function(){
		expect(widgetService).to.have.property('defaultList').that.is.an('object')
	})
	it('should have defaultList Property that is an object',function(){
		expect(widgetService).to.have.property('defaultList').that.is.an('object')
	})
	describe('#restoreDash',function(){
			
		it('should have restoreDash method',function(){
			expect(widgetService.restoreDash).to.be.a('function')
		})
		// it('should call a method $http',function(){
		// 	 sinon.spy($http,'get');
		// 	 widgetService.restoreDash()
		// 	 expect($http.get.calledOnce).to.be.equal(true, 'you must call $http.get() method')
		// 	 widgetService.restoreDash.restore();
		// });
		// it('should call a method restoreDash',function(){
		// 	 sinon.spy(widgetService,'restoreDash');
		// 	 widgetService.restoreDash()
		// 	 expect(widgetService.restoreDash.calledOnce).to.be.equal(true, 'you must call restoreDash() method')
		// 	 widgetService.restoreDash.restore();
		// });
		// it('should return an object',function(done){


		// 	var stub = sinon.stub(widgetService,'restoreDash');
		// 	stub.resolves({'accepted':3});

		// 	expect(widgetService.restoreDash()).to.have.eventually.property('accepted').notify(done);

		// });
	})
	
})