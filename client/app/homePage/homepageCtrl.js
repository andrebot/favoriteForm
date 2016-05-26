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

    vm.tabSelected = 0;
    vm.maxTabs = 3;

    vm.handleInputCompletion = function (isValid, value, step) {
      if (isValid) {
        $rootScope.$broadcast('fillInputCompletion', { value: value, step: step });
      } else {
        $rootScope.$broadcast('drainInputCompletion', { value: value, step: step });
      }
    };

    vm.nextTab = function () {
      if (vm['form' + (vm.tabSelected + 1)].$valid && vm.tabSelected < vm.maxTabs) {
        vm.tabSelected++;
      }
    };

    vm.previousTab = function () {
      if (vm.tabSelected > 0) {
        vm.tabSelected--;
      }
    };
  }

})();
