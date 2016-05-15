angular.module('core').directive('htmlEllipsis', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope:{parentId:'=parentId'},
            link: function(scope, element, attrs) {
                $timeout(function() {
                    angular.element(element).ellipsis();
                }, 0);
                scope.$on('ellipsContent-'+scope.parentId,function(){
                  console.log('ellipsContent ellipsContent ellipsContent');
                  
                  console.log(element);
                   $timeout(function() {
                    angular.element(element).ellipsis();
                  }, 1000);
                })
            }
        };
    }]);

// .directive('ellipsis', [function () {
//     return {
//         required: 'ngBindHtml',
//         scope:{contentHtml:'=contentHtml',parentId:'=parentId'},
//         restrict: 'A',
//         priority: 100,
//         link: function ($scope, element, attrs, ctrl) {
//             $scope.hasEllipsis = false;

//             setTimeout(function(){
//             element.ellipsis(null,{live:true});
              
//             },1)
// // console.log($scope.parentId);
//             $scope.$on('ellipsContent-'+$scope.parentId,function(){
//               console.log('ellipsContent ellipsContent ellipsContent');

//               console.log(element);
//               // setTimeout(function(){
//                 element.ellipsis();
                
//               // },1)
//             })
//         }
//     };
// }]);