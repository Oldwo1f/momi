angular.module('momi-user', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('users', {
        url : '/users',
        parent:'dashboard',
        params:{
                sort:'createdAt DESC',
                page:1,
                nbPerPage : 10
        },
        views:{
            'page1': {
                template: '<users-page users-list="usersList"></users-page>',
                controller:["$scope", "usersList", function($scope, usersList){
                        $scope.usersList = usersList;
                }],
                resolve:{
                    usersList :  ["userService", "$stateParams", function(userService, $stateParams){
                        

                        console.log('RESOLVE');
                        console.log($stateParams);
                        return userService.fetch($stateParams.sort,$stateParams.page,$stateParams.nbPerPage)
                    }]
                }
            }

        }
       })
      .state('profile', {
        url : '/profile',
        parent:'dashboard',
        // params:{
        //         sort:'createdAt DESC',
        //         page:1,
        //         nbPerPage : 10
        // },
        views:{
            'page1': {
                template: '<profile-page profile-infos="profileInfos"></profile-page>',
                controller:["$scope", "profileInfos", function($scope, profileInfos){
                        $scope.profileInfos = profileInfos;
                }],
                resolve:{
                    profileInfos :  ["userService", "$stateParams", "$auth", function(userService, $stateParams,$auth){
                        

                        
                        return userService.selfProfile($auth.getPayload().sub)
                    }]
                }
        	}

        }
       })

}]);

