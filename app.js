var app = angular.module('assessment', ['ngRoute']);

// app.directive('menu', function(quizFactory) {
// 	return {
// 		restrict: 'AE',
// 		scope: {},
// 		templateUrl: 'template.html'
// 	}
// });
//

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'menu.html',
	})
	.when('/full', {
		templateUrl : 'full.html',
	})
	.when('/depression', {
		templateUrl : 'depression.html',
	})
	.when('/anxiety', {
		templateUrl : 'anxiety.html',
	})
	.when('/wellbeing', {
		templateUrl : 'wellbeing.html',
	})
	.when('/screening', {
		templateUrl : 'screening.html',
	})
	.otherwise({
		redirectTo: '/'
	});
}]);


app.controller('menuController',function(assessmentFactory, $scope, $routeParams, $location, $http){
	$scope.init = function() {
		assessmentFactory.init($http);
		$scope.quizOver = false;
		$scope.inProgress = false;
		var dialog = document.getElementById("modal");
		if (dialog) {
			dialog.open();
		}
	};
	$scope.changeView = function(view){
		$location.path(view);
	};
});

app.controller('questionController', function(assessmentFactory, $scope, $routeParams, $location,$http){
	$scope.load = function(assessmentType) {
		$scope.inProgress = true;
		$scope.assessmentType = assessmentType;
		$scope.currentId = 0;
		$scope.questions = assessmentFactory.getAssessment(assessmentType);
		$scope.numQuestions = assessmentFactory.getNumQuestions(assessmentType);
		$scope.getQuestion();
		var pages = document.querySelector('neon-animated-pages');
		pages.selected="0";
		pages.entryAnimation = 'slide-from-right-animation';
		pages.exitAnimation = 'slide-left-animation';
		pages.selectNext();
	};

	$scope.next = function() {
		$scope.currentId++;
		$scope.getQuestion();
		var pages = document.querySelector('neon-animated-pages');
		pages.entryAnimation = 'slide-from-right-animation';
		pages.exitAnimation = 'slide-left-animation';
		pages.selectNext();
	};

	$scope.previous = function() {
		$scope.currentId--;
		$scope.getQuestion();
		var pages = document.querySelector('neon-animated-pages');
		pages.entryAnimation = 'slide-from-left-animation';
		pages.exitAnimation = 'slide-right-animation';
		pages.selectPrevious();
	};

	$scope.finish = function() {
		$scope.saveResults();
	};

  $scope.saveResults = function() {

	};

	$scope.getQuestion = function() {
		var q = assessmentFactory.getQuestion($scope.assessmentType, $scope.currentId);
		if(q) {
			$scope.question = q.question;
			$scope.options = q.options;
		} else {
			$scope.quizOver = true;
		}
	};

});


app.factory('assessmentFactory', function($http) {
	var assessmentFactory = {};
	var PHQ2 = [];
	var GAD2 = [];
	var PHQ9 = [];
	var IDS_SR = [];
	var GAD7 = [];
	var WHO5 = [];
	var ADD = [];
	var fullAssessment = [];
	var depressionAssessment = [];
	var axietyAssessment = [];
	var wellbeingAssessment = [];
	var screeningAssessment = [];
	var addAssessment = [];
	assessmentFactory.init = function(http) {
	http.get('assessment.json')
		.success(function(json){
				PHQ2 = json[0].PHQ2;
			  GAD2 = json[0].GAD2;
				PHQ9 = json[0].PHQ9;
				IDS_SR = json[0].IDS_SR;
				GAD7 = json[0].GAD7;
			  WHO5 = json[0].WHO5;
				ADD = json[0].ADD;
			});
	};
	assessmentFactory.getNumQuestions = function(type) {
		var questions = this.getAssessment(type);
		return questions.length;
	};
	assessmentFactory.getQuestion = function(type, id) {
		var questions = this.getAssessment(type);

		if(id < questions.length) {
			return questions[id];
		} else {
			return false;
		}
	};
	assessmentFactory.getAssessment = function(type) {
		var questions = [];
		if(type == "full"){
			questions = fullAssessment.concat(PHQ2)
															  .concat(GAD2)
													      .concat(PHQ9)
																.concat(IDS_SR)
													      .concat(GAD7)
													      .concat(WHO5)
													      .concat(ADD);
		}
		else if (type == "depression") {
			questions = depressionAssessment.concat(PHQ2)
																	    .concat(GAD2);
		}
		else if (type == "anxiety"){
			questions = anxietyAssessment.concat(PHQ2)
																	 .concat(GAD2)
																	 .concat(GAD7);
		}
		else if (type == "wellbeing"){
			questions = wellbeingAssessment.concat(PHQ2)
																	   .concat(GAD2);
		}
		else if (type == "screening"){
			questions = screeningAssessment.concat(PHQ2)
																		 .concat(GAD2);
		}
		else if (type == "add"){
			questions = addAssessment.concat(PHQ2)
															 .concat(GAD2);
		}
		return questions;
	};
  return assessmentFactory;
});
