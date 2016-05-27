(function () {
  'use strict';

  angular.module('favForm.services').factory('AnswersService', AnswersService);

  function AnswersService (localStorageServiceProvider) {
    return {
      saveAnswers: saveAnswers,
      listSavedAnswers: listSavedAnswers,
      getAnswer: getAnswer
    };

    function saveAnswers (key, form1, form2) {
      localStorageServiceProvider.set(key, {form1: form1, form2: form2});
    }

    function listSavedAnswers () {
      return localStorageServiceProvider.keys();
    }

    function getAnswer (key) {
      return localStorageServiceProvider.get(key);
    }
  }

})();
