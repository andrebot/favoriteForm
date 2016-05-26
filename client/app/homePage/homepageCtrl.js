(function () {
  'use strict';

  angular.module('FavForm')
    .controller('homepageController', HomepageController);

  function HomepageController () {
    var vm = this;

    vm.step1 = {
      favSTMovie: '',
      tvSeries: '',
      bolachaBiscoito: '',
      bestQuote: ''
    };
  }

})();
