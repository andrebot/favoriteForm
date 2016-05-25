(function () {
  'use strict';

  angular.module('FavForm')
    .config(RouteConfig);

  function RouteConfig ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'homepageController',
        controllerAs: 'vm',
        templateUrl: '/views/homepage.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
