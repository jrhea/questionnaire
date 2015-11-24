var app = angular.module('assessment', ['ngRoute'])
.service('sharedProperties', function () {

});

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'menu.html',
	})
	.when('/summary', {
		templateUrl : 'summary.html',
	})
	.when('/userinfo', {
		templateUrl : 'userinfo.html',
	})
	.otherwise({
		templateUrl: 'assessment.html'
	});
}]);

app.controller('assessmentController', function(assessmentFactory, sharedProperties, $scope, $routeParams, $location,$http){
	$scope.pdfString = "";
	$scope.assessmentType = "";
	$scope.assessmentTypes = [];
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
			$scope.assessmentType = element.get(property);
			if($scope.assessmentType != undefined)
			{
				$scope.session = assessmentFactory.loadSession($scope.assessmentType);
				$location.path('/userinfo');
				$scope.session.module = "userInfo";
			}
		}
	};

	$scope.loadUserInfo = function(){
		return true;
	};

	$scope.submitUserInfo = function(){
		$location.path($scope.assessmentType);
	};
	$scope.loadAssessment = function() {

	};

	$scope.notify = function(componentType) {
		var selection = -1;
		var component = document.querySelector(componentType);
		if(component)
		{
			//update session variable from View
			$scope.session = component.session;
			if($scope.session.module == "userInfo")
			{
				if($scope.session.eventType == "submitUserInfo")
				{
						$location.path('/assessment');
						this.session.module = "assessment";
				}
			}
			else if($scope.session.module == "assessment")
			{
				selection = $scope.session.questions[$scope.session.index].selection;
				if(selection == -1 && ( $scope.session.eventType == "selectNext" || $scope.session.eventType == "selectFinish"))
				{
					//TODO: Force user to make selection
				}
		    if($scope.session.eventType == "selectFinish")
				{
						//generate pdf
						$location.path('/summary');
						this.session.module = "summary";
				}
			}
		}
	};

	$scope.loadSummary = function(){
		var question = {};
		var numQuestions = $scope.session.questions.length;
		for(var i=0;i<numQuestions;i++)
		{
			question = $scope.session.questions[i];
			$scope.session.score += question.options[question.selection].value;
		}
	};
	$scope.loadPDF = function(){
		$scope.pdfString = generatePDF($scope.session);
		if ( $scope.pdfString === "")
		{
			return false;
		}
		else {
			return true
		}
	};

});


app.factory('assessmentFactory', function($http) {
	var assessmentFactory = {};
	var assessmentDefinition = {};
	var session = {};

	assessmentFactory.init = function(http) {
	  http.get('assessmentDefinition.json').success(function(json){
			assessmentDefinition = json;
	  });
		http.get('session.json').success(function(json){
				session = json;
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
	assessmentFactory.getQuestions = function(type) {
		var questions = [];
		for(index in assessmentDefinition.assessmentTypes[type])
		{
			var questionType = assessmentDefinition.assessmentTypes[type][index];
			questions = questions.concat(assessmentDefinition.questionTypes[questionType]);
		}
		return questions;
	};

	assessmentFactory.loadSession = function(type) {
		session.type = type;
		session.questions = this.getQuestions(type);
		session.date = new Date().toLocaleDateString();
		return session;
	};
  return assessmentFactory;
});
