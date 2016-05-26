angular.module('momi-user').directive('uniqueemail',  ['$http', '$q', function uniqueemail($http,$q)
    {
        'use strict';

        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                uniqueemail: '='
            },
            link: function (scope, el, attrs, ngModel)
            {

            	console.log('LINK UniqueEmail directive');

                ngModel.$asyncValidators.uniqueemail = function(modelValue, viewValue) {
				  	var value = modelValue || viewValue;
				  	console.log('validating...');
					// var deferred = $q.defer();
					return $http.get('/user/verifyUniqueEmail/' + value).
					then(function resolved() {
						console.log('exist');
					//username exists, this means validation fails
						return $q.reject('exists');
					}, function rejected() {
						console.log('Ok to go');
						//username does not exist, therefore this validation passes
						return true;
					});

				    

				};
			
            }
        };
    }])

.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});