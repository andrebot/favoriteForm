'use strict';

describe('Answers Service', function () {

  beforeEach(module('FavForm'));

  var AnswersService;
  var localStorageService;

  beforeEach(inject(function (_AnswersService_, _localStorageService_) {
    AnswersService = _AnswersService_;
    localStorageService = _localStorageService_;

    spyOn(localStorageService, 'keys').and.returnValue(['oi', 'thacu']);
    spyOn(localStorageService, 'get');
    spyOn(localStorageService, 'set');
  }));

  describe('Testing services', function () {

    it('Should save a given answer', function () {
      var data = {
        key: '42',
        form1: {none: 'here'},
        form2: {none: 'either'}
      }

      AnswersService.saveAnswers(data.key, data.form1, data.form2);

      expect(localStorageService.set).toHaveBeenCalledWith(data.key, {form1: data.form1, form2: data.form2});
    });

    it('Should get a given answer', function () {
      var key = 42;

      AnswersService.getAnswer(key);

      expect(localStorageService.get).toHaveBeenCalledWith(key);
    });

    it('Should list all answers', function () {
      AnswersService.listSavedAnswers();

      expect(localStorageService.keys).toHaveBeenCalled();
    });
  });
});
