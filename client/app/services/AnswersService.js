(function () {
  'use strict';

  angular.module('favForm.services').factory('AnswersService', AnswersService);

  function AnswersService (localStorageService) {
    return {
      saveAnswers: saveAnswers,
      listSavedAnswers: listSavedAnswers,
      getAnswer: getAnswer
    };

    function saveAnswers (key, form1, form2) {
      localStorageService.set(key, {form1: form1, form2: form2});
    }

    function listSavedAnswers () {
      return localStorageService.keys();
    }

    function getAnswer (key) {
      return localStorageService.get(key);
    }
  }

})();
