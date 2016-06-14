angular.module('momi-projects', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    
      $stateProvider
	    .state('projects', {
	        url : '/projects',
	        params:{
	        	sort:'date DESC',
	        	page:1,
	        	nbPerPage : 10
	    	},
	        parent:'dashboard',
	        views:{
	        	'page1': {
	        		template: '<projects projects-list="projectsList"></projects>',
	        		controller:["$scope", "projectsList", function($scope, projectsList){
	        			$scope.projectsList = projectsList;
	        		}],
	        		resolve:{
	                    projectsList :  ["projectService", "$stateParams", function(projectService, $stateParams){
	                        

	                        return projectService.fetch($stateParams.sort,$stateParams.page,$stateParams.nbPerPage)
	                    }]
	                }
	        	}

	        }
       	})
      	.state('projects.add', {
	        url : '/add',
	        parent:'projects',
	        views:{
	        	'page2@dashboard': {
	        		template: '<add-project new-project="newProject"></add-project>',
	        		controller:["$scope", "newProject", function($scope, newProject){
	        			$scope.newProject = newProject;
	        		}],
	        		resolve:{
	                    newProject :  ["projectService", function(projectService){
	                        
	                        return projectService.createBlank()
	                    }]
	                }
	        	}

	        }
       	})
      	.state('projects.edit', {
	        url : '/edit/:id',
	        parent:'projects',
	        views:{
	        	'page2@dashboard': {
	        		template: '<add-project new-project="newProject"></add-project>',
	        		controller:["$scope", "newProject", function($scope, newProject){
	        			$scope.newProject = newProject;
	        		}],
	        		resolve:{
	                    newProject :  ["projectService", "$stateParams", function(projectService,$stateParams){
	                        
	                        return projectService.fetchOne($stateParams.id)
	                    }]
	                }
	        	}

	        }
       	})

}]);
