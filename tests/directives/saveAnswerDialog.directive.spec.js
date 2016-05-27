'use strict';

describe('SaveAnserDialog Directive', function () {

  beforeEach(module('FavForm'));

  var $controller;
  var $rootScope;
  var $compile;
  var $httpBackend;
  var $mdDialog;
  var $mdMedia_;
  var $scope = {};
  var answerService;
  var ctrl;
  var form1;
  var form2;
  var maxTabs;
  var tabSelected;
  var updateForms;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, 
                              _$httpBackend_, _AnswersService_,
                              _$mdDialog_, _$mdMedia_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    $mdMedia_ = _$mdMedia_;
    answerService = _AnswersService_;
  }));

  describe('Testing save answer\'s actions', function () {
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

      maxTabs = 3;
      tabSelected = 0;

      $scope.form1 = form1;
      $scope.form2 = form2;
      $scope.maxTabs = maxTabs;
      $scope.tabSelected = tabSelected;

      $httpBackend.whenGET('/views/saveButton.html')
        .respond({success: true, data: '<h1></h1>'});

      var el = angular.element('<save-answer-dialog form1="form1" form2="form2" maxTabs="maxTabs" tabSelected="tabSelected"></save-answer-dialog>');
      $compile(el)($scope);

      $rootScope.$digest();
      $httpBackend.flush();

      ctrl = el.controller('saveAnswerDialog');
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should open the \'Load Answer\' Grid Sheet', function () {
      spyOn($mdDialog, 'show').and.returnValue({
        then: function () {}
      });

      $httpBackend.whenGET('/views/saveAnswerDialog.html')
        .respond({success: true, data: '<h1></h1>'});

      ctrl.openSaveDialog();

      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('Should save the selected answer', function () {
      var key = 'qualquer';

      spyOn(answerService, 'saveAnswers');
      spyOn($mdDialog, 'show').and.returnValue({
        then: function () {}
      });
      spyOn($mdDialog, 'alert').and.callThrough();

      $httpBackend.whenGET('/views/loadAnswerGridSheet.html')
        .respond({success: true, data: '<h1></h1>'});

      ctrl.saveAnswers({})(key);

      expect(answerService.saveAnswers).toHaveBeenCalled();
      expect($mdDialog.show).toHaveBeenCalled();
      expect($mdDialog.alert).toHaveBeenCalled();
    });
  });
});
