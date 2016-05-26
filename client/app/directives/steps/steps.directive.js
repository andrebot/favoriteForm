(function () {
  'use strict';

  angular.module('favForm.directives').directive('favformSteps', FavFormSteps);

  function FavFormSteps () {
    return {
      restrict: 'E',
      scope: {
        steps: '@',
        selectedStep: '='
      },
      templateUrl: '/views/steps.html',
      controller: FavFormController,
      controllerAs: 'vm'
    };

    function FavFormController ($scope) {
      var vm = this;
      vm.stepsCompletion = [];

      vm.init = function () {
        var stepCompletion;

        for (var i = parseInt($scope.steps); i > 0; i--) {
          stepCompletion = {
            completion: 0,
            completed: false
          };

          vm.stepsCompletion.push(stepCompletion);
        }
      };

      vm.getFlexNumber = function (isLast) {
        return isLast ? 5 : 'auto';
      };

      vm.init();

      $scope.$on('fillInputCompletion', function (evts, completionStatus) {
        var completionPercentage = completionStatus.value;
        var step = completionStatus.step - 1;

        if (vm.stepsCompletion[step].completion < 100) {
          vm.stepsCompletion[step].completion += completionPercentage;
        }
      });

      $scope.$on('drainInputCompletion', function (evts, completionStatus) {
        var completionPercentage = completionStatus.value;
        var step = completionStatus.step - 1;

        if (vm.stepsCompletion[step].completion > 0) {
          vm.stepsCompletion[step].completion -= completionPercentage;
        }
      });

      $scope.$on('nextStep', function (evts) {
        if (vm.stepsCompletion[$scope.selectedStep].completion >= 100) {
          vm.stepsCompletion[$scope.selectedStep].completed = true;
        }
      });
    }
  }
})();
