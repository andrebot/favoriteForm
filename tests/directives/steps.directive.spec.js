'use strict';

describe('Steps Directive', function () {

  beforeEach(module('FavForm'));

  var $controller;
  var $rootScope;
  var $compile;
  var $httpBackend;
  var $scope = {};
  var ctrl;
  var steps;
  var selectedStep;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, 
                              _$httpBackend_, _AnswersService_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
  }));

  describe('Testing steps initialization and setup', function () {
    beforeEach(function () {
      $scope = $rootScope.$new();

      steps = 3;
      selectedStep = 1;

      $scope.steps = steps;
      $scope.selectedStep = selectedStep;

      $httpBackend.whenGET('/views/steps.html')
        .respond({success: true, data: '<h1></h1>'});

      var el = angular.element('<favform-steps steps="{{steps}}" selectedStep="selectedStep"></favform-steps>');
      $compile(el)($scope);

      $rootScope.$digest();
      $httpBackend.flush();

      ctrl = el.controller('favformSteps');
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should have been initialized with a setpCompletion object', function () {
      expect(ctrl.stepsCompletion.length).toEqual(steps);
    });

    it('Should return \'auto\' for any element that is not the last element', function () {
      var value = ctrl.getFlexNumber(false);

      expect(value).toEqual('auto');
    });

    it('Should return \'5\' for the last element', function () {
      var value = ctrl.getFlexNumber(true);

      expect(value).toEqual(5);
    });
  });

  describe('Testing event listeners', function () {
    beforeEach(function () {
      $scope = $rootScope.$new();

      steps = 3;
      selectedStep = 1;

      $scope.steps = steps;
      $scope.selectedStep = selectedStep;

      $httpBackend.whenGET('/views/steps.html')
        .respond({success: true, data: '<h1></h1>'});

      var el = angular.element('<favform-steps steps="{{steps}}" selected-step="selectedStep"></favform-steps>');
      $compile(el)($scope);

      $rootScope.$digest();
      $httpBackend.flush();

      ctrl = el.controller('favformSteps');
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should \"fill\" a percetage of a step given a percentage number if it is not 100%', function () {
      var data = {
        step: 1,
        value: 25
      };
      var oldPercentage = ctrl.stepsCompletion[data.step].completion;

      ctrl.fillInputCompletion({}, data); 

      expect(ctrl.stepsCompletion[data.step - 1].completion)
        .toEqual(oldPercentage + data.value);
    });

    it('Should not \"fill\" a percetage of a step if it is 100%', function () {
      var data = {
        step: 1,
        value: 25
      };
      ctrl.stepsCompletion[data.step - 1].completion = 100;

      ctrl.fillInputCompletion({}, data); 

      expect(ctrl.stepsCompletion[data.step - 1].completion)
        .toEqual(100);
    });

    it('Should \"drain\" a percetage of a step given a percentage number if it is not 100%', function () {
      var data = {
        step: 1,
        value: 25
      };

      ctrl.stepsCompletion[data.step - 1].completion = 100;
      var oldPercentage = 100;

      ctrl.drainInputCompletion({}, data); 

      expect(ctrl.stepsCompletion[data.step - 1].completion)
        .toEqual(oldPercentage - data.value);
    });

    it('Should not \"drain\" a percetage of a step if it is 0%', function () {
      var data = {
        step: 1,
        value: 25
      };

      ctrl.drainInputCompletion({}, data); 

      expect(ctrl.stepsCompletion[data.step - 1].completion)
        .toEqual(0);
    });

    it('Should get to the next step if the actual step is completed', function () {
      ctrl.stepsCompletion[selectedStep].completion = 100;

      ctrl.nextStep({}); 

      expect(ctrl.stepsCompletion[selectedStep].completed)
        .toBeTruthy();
    });

    it('Should not get to the next step if the actual step is not completed', function () {
      ctrl.nextStep({}); 

      expect(ctrl.stepsCompletion[selectedStep].completed)
        .toBeFalsy();
    });
  });
});
