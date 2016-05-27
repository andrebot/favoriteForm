(function () {
  'use strict';

  angular
    .module('favForm.services', ['LocalStorageModule'])
    .config(ServicesConfiguration);

  function ServicesConfiguration (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('FavFormServices');
  }

})();
