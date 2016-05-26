(function () {
  'use strict';

  angular.module('FavForm')
    .controller('homepageController', HomepageController);

  function HomepageController ($rootScope) {
    var vm = this;

    vm.worthyStarWarsMovies = ['a new hope',
                               'the empire strikes back',
                               'return of the jedi',
                               'the force awakens'];

    vm.step1 = {
      favSTMovie: '',
      tvSeries: '',
      bolachaBiscoito: '',
      bestQuote: ''
    };

    vm.handleInputCompletion = function (isValid, value, step) {
      if (isValid) {
        $rootScope.$broadcast('fillInputCompletion', { value: value, step: step });
      }
    };
  }

})();
