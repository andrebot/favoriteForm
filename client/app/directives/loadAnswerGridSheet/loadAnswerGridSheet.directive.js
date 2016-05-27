(function () {
  'use strict';

  angular.module('favForm.directives').directive('loadAnswerGridSheet', LoadAnswerGridSheet);

  function LoadAnswerGridSheet () {
    return {
      restrict: 'E',
      scope: {
        form1: '=',
        form2: '=',
        updateForms: '&'
      },
      templateUrl: '/views/loadAnswerButton.html',
      controller: LoadAnswerButtonController,
      controllerAs: 'vm'
    };
  }

  function LoadAnswerButtonController ($scope, $mdBottomSheet, $mdToast, AnswersService) {
    var vm = this;
    vm.answersList = [];

    vm.loadAnswer = function (key) {
      var answers = AnswersService.getAnswer(key);

      $scope.form1 = answers.form1;
      $scope.form2 = answers.form2;

      $scope.updateForms();

      $mdToast.show(
        $mdToast.simple()
          .textContent('Answer loaded successfully!')
          .position('top right')
          .hideDelay(1000)
      );
    };

    vm.showAnswers = function (evt) {
      vm.answersList = AnswersService.listSavedAnswers();

      $mdBottomSheet.show({
        templateUrl: '/views/loadAnswerGridSheet.html',
        controller: LoadAnswerGridSheetController,
        controllerAs: 'vm',
        locals: {
          answersList: vm.answersList
        }
      }).then(vm.loadAnswer);
    };
  }

  function LoadAnswerGridSheetController ($mdBottomSheet, answersList) {
    var vm = this;
    vm.answersList = answersList;

    vm.load = function (key) {
      $mdBottomSheet.hide(key);
    };
  }
})();
