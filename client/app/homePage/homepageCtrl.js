(function () {
  'use strict';

  angular.module('FavForm')
    .controller('homepageController', HomepageController);

  function HomepageController ($rootScope) {
    var vm = this;

    vm.step1 = {
      favSTMovie: '',
      tvSeries: '',
      bolachaBiscoito: '',
      bestQuote: ''
    };
    vm.step1InputStatus = [false, false, false, false];

    vm.step2 = {
      selectedRadio: 0
    };

    vm.foods = [{
      id: 0,
      text: 'I am an insect.',
      url: '/imgs/yummy-insect.jpeg'
    },{
      id: 1,
      text: 'I love pasta.',
      url: '/imgs/pasta.jpeg'
    },{
      id: 2,
      text: 'Gimme meat.',
      url: '/imgs/meat.jpeg'
    },{
      id: 3,
      text: 'Is it food? I am in.',
      url: '/imgs/food.jpeg'
    }];

    vm.tabSelected = 0;
    vm.maxTabs = 3;
    vm.disableNextButton = true;

    vm.handleInputCompletion = function (isValid, index, value, step) {
      if (isValid) {
        //This condition is down here because its exception is not to drain the input completion
        if (!vm.step1InputStatus[index]) {
          $rootScope.$broadcast('fillInputCompletion', { value: value, step: step });
          vm.step1InputStatus[index] = true;
        }
      } else if (vm.step1InputStatus[index]) {
        $rootScope.$broadcast('drainInputCompletion', { value: value, step: step });
        vm.step1InputStatus[index] = false;
      }

      vm.enableNextButton();
    };

    vm.handleRadioSelect = function (value, step) {
      if (vm.step2.selectedRadio > 0) {
        $rootScope.$broadcast('fillInputCompletion', { value: value, step: step });
      }
    };

    vm.nextTab = function () {
      vm.tabSelected++;
    };

    vm.enableNextButton = function () {
      vm.disableNextButton = !(vm['form' + (vm.tabSelected + 1)].$valid && vm.tabSelected < vm.maxTabs);
    };

    vm.previousTab = function () {
      if (vm.tabSelected > 0) {
        vm.tabSelected--;
      }
    };

    vm.showSaveDialog = function () {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    };
  }

})();
