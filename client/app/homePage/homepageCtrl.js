(function () {
  'use strict';

  angular.module('FavForm')
    .controller('homepageController', HomepageController);

  function HomepageController ($scope) {
    $scope.test = 'ola';
  }

})();
