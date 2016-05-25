(function () {
  'use strict';

  angular.module('FavForm')
    .controller('homepageController', HomepageController);

  function HomepageController () {
    var vm = this;

    vm.test = 'agora';
  }

})();
