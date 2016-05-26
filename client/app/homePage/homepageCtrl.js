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

    vm.step2 = {
      selectedRadio: 0
    };

    vm.foods = [{
      id: 1,
      text: 'I am an insect.',
      url: '/imgs/yummy-insect.jpeg'
    },{
      id: 2,
      text: 'I love pasta.',
      url: '/imgs/pasta.jpeg'
    },{
      id: 3,
      text: 'Gimme meat.',
      url: '/imgs/meat.jpeg'
    },{
      id: 4,
      text: 'Is it food? I am in.',
      url: '/imgs/food.jpeg'
    }];

    vm.tabSelected = 0;
    vm.maxTabs = 3;

    vm.handleInputCompletion = function (isValid, value, step) {
      if (isValid) {
        $rootScope.$broadcast('fillInputCompletion', { value: value, step: step });
      } else {
        $rootScope.$broadcast('drainInputCompletion', { value: value, step: step });
      }
    };

    vm.handleRadioSelect = function (value, step) {
      if (vm.step2.selectedRadio > 0) {
        $rootScope.$broadcast('fillInputCompletion', { value: value, step: step });
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
