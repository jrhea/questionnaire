var app = angular.module('assessment', ['ngRoute'])
.service('sharedProperties', function () {
		var _assessmentType = '';
		var _currentId = 0;
		var _assessment = {};
		var _assessmentTypes = [];
		this.currentId = _currentId;
		this.assessmentType = _assessmentType;
		this.assessment = _assessment;
		this.assessmentTypes = _assessmentTypes;
});

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'menu.html',
	})
	.otherwise({
		templateUrl: 'assessment.html'
	});
}]);

app.controller('assessmentController', function(assessmentFactory, sharedProperties, $scope, $routeParams, $location,$http){

	$scope.init = function() {
		assessmentFactory.init($http);
		$location.path('/');
	};

	$scope.loadMenu = function(){
		$scope.assessmentTypes = assessmentFactory.getAssessmentTypes();
		return true;
	};

	$scope.selectAssessment = function(property){
		var element = document.querySelector("x-menu-dialog");
		if(element){
			assessmentType = element.get(property);
		}
		sharedProperties.assessmentType = assessmentType;
		$location.path(assessmentType);
	};

	$scope.loadAssessment = function() {
		$scope.sharedProperties = sharedProperties;
		sharedProperties.assessment = assessmentFactory.getAssessment(sharedProperties.assessmentType);
		$scope.assessment = sharedProperties.assessment;
	};


	$scope.selectOption = function(property) {
		var element = document.querySelector("x-options");
		if(element){
			var id = element.get(property);
			sharedProperties.assessment[sharedProperties.currentId].options[id].isSelected=true;
			sharedProperties.assessment[sharedProperties.currentId].selection=id;
		}
	}

	$scope.next = function() {
		sharedProperties.currentId++;
		$scope.loadQuestion();
		var pages = document.querySelector('x-animated-pages');
		pages.selectNext();
	};

	$scope.previous = function() {
		sharedProperties.currentId--;
		$scope.loadQuestion();
		var pages = document.querySelector('x-animated-pages');
		pages.selectPrevious();
	};

	$scope.finish = function() {
		$scope.saveResults();
	};

  $scope.saveResults = function() {

	};

});


app.factory('assessmentFactory', function($http) {
	var assessmentFactory = {};
	var assessmentDefinition = {};
	var assessment = {};

	assessmentFactory.init = function(http) {
	  http.get('assessmentDefinition.json').success(function(json){
			assessmentDefinition = json;
	  });
	};
  assessmentFactory.getAssessmentTypes = function() {
		var types = [];
		for(type in assessmentDefinition.assessmentTypes)
		{
			types.push({type});
		}
		return types;
	}
	assessmentFactory.getAssessment = function(type) {
		var assessment = [];
		for(index in assessmentDefinition.assessmentTypes[type])
		{
			var questionType = assessmentDefinition.assessmentTypes[type][index];
			assessment = assessment.concat(assessmentDefinition.questionTypes[questionType]);
		}
		return assessment;
	};
  return assessmentFactory;
});
