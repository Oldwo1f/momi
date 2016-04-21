describe('widgetService',function(){

	var widgetService, $http;

	beforeEach(function(){
		angular.mock.module('core')
		angular.mock.inject(function(_widgetService_,$httpBackend){
			widgetService = _widgetService_;
			$http = $httpBackend;
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
		it('should call http',function(){
			$http.whenGET('/restoreDash')
			widgetService.restoreDash();
			// expect(widgetService.restoreDash).to.be.a('function')
		// $http.flush();
			
		})
	})
	
})