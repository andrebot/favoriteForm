'use strict';

describe( 'LoadAnswerGridSheet Directive', function () {

  beforeEach(module('FavForm'));

  var $controller;
  var $rootScope;
  var $compile;
  var $httpBackend;
  var $mdBottomSheet;
  var $mdToast;
  var $scope = {};
  var answerService;
  var ctrl;
  var form1;
  var form2;
  var updateForms;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, 
                              _$httpBackend_, _AnswersService_,
                              _$mdBottomSheet_, _$mdToast_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $mdBottomSheet = _$mdBottomSheet_;
    $mdToast = _$mdToast_;
    answerService = _AnswersService_;
  }));

  describe('Testing loading answer\'s actions', function () {
    beforeEach(function () {
      $scope = $rootScope.$new();

      form1 = {
        favSTMovie: 'A new Hope',
        tvSeries: 'Game Of Thrones',
        bolachaBiscoito: 'Bolacha',
        bestQuote: 'Let\'s put a smile on that face!'
      };

      form2 = {
        selectedRadio: 1
      };

      updateForms = function () {};

      $scope.form1 = form1;
      $scope.form2 = form2;
      $scope.updateForms = updateForms;

      $httpBackend.whenGET('/views/loadAnswerButton.html')
        .respond({success: true, data: '<h1></h1>'});

      var el = angular.element('<load-answer-grid-sheet form1="form1" form2="form2" update-forms="updateForms()"></load-answer-grid-sheet>');
      $compile(el)($scope);

      $rootScope.$digest();
      $httpBackend.flush();

      ctrl = el.controller('loadAnswerGridSheet');
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should open the \'Load Answer\' Grid Sheet', function () {
      spyOn(answerService, 'listSavedAnswers');
      spyOn($mdBottomSheet, 'show').and.returnValue({
        then: function () {}
      });

      $httpBackend.whenGET('/views/loadAnswerGridSheet.html')
        .respond({success: true, data: '<h1></h1>'});

      ctrl.showAnswers();

      expect(answerService.listSavedAnswers).toHaveBeenCalled();
      expect($mdBottomSheet.show).toHaveBeenCalled();
    });

    it('Should load the selected answer', function () {
      var key = 'qualquer';

      spyOn(answerService, 'getAnswer').and.callFake(function () {
        return {
          form1: {},
          form2: {}
        }
      });

      spyOn($scope, 'updateForms');
      spyOn($mdToast, 'show');
      spyOn($mdToast, 'simple').and.callThrough();

      $httpBackend.whenGET('/views/loadAnswerGridSheet.html')
        .respond({success: true, data: '<h1></h1>'});

      ctrl.loadAnswer(key);

      expect(answerService.getAnswer).toHaveBeenCalledWith(key);
      expect($scope.updateForms).toHaveBeenCalled();
      expect($mdToast.show).toHaveBeenCalled();
      expect($mdToast.simple).toHaveBeenCalled();
    });
  });
});
