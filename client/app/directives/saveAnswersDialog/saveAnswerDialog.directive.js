(function () {
  'use strict';

  angular.module('favForm.directives').directive('saveAnswerDialog', SaveAnswerDialog);

  function SaveAnswerDialog () {
    return {
      restrict: 'E',
      scope: {
        form1: '=',
        form2: '=',
        tabSelected: '=',
        maxTabs: '='
      },
      templateUrl: '/views/saveButton.html',
      controller: SaveAnswerButtonController,
      controllerAs: 'vm'
    };
  }

  function SaveAnswerButtonController ($scope, $mdDialog, $mdMedia, AnswersService) {
    var vm = this;

    vm.saveAnswers = function (evt) {
      return function (key) {
        AnswersService.saveAnswers(key, $scope.form1, $scope.form2);

        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Success!')
            .textContent('You have saved your answers successfully!')
            .ariaLabel('Success saving answers')
            .ok('Ok')
            .targetEvent(evt)
        );
      };
    };

    vm.openSaveDialog = function (evt) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

      $mdDialog.show({
        controller: SaveAnswerDialogController,
        controllerAs: 'vm',
        templateUrl: '/views/saveAnswerDialog.html',
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      }).then(vm.saveAnswers(evt));
    };
  }

  function SaveAnswerDialogController ($mdDialog) {
    var vm = this;
    vm.key = '';
    vm.test = true;

    vm.save = function () {
      $mdDialog.hide(vm.key);
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.enableSaveButton = function (isValid) {
      vm.test = !isValid;
    };
  }
})();
