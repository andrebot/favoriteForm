'use strict';

describe( 'Homepage Controller', function () {

  beforeEach(module('FavForm'));

  var $controller;
  var $rootScope;
  var $scope = {};
  var ctrl;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('Testing input handling for form completion', function () {
    beforeEach(inject(function () {
      $scope = $rootScope.$new();
      ctrl = $controller('homepageController', {
        $scope: $scope
      });
      spyOn($rootScope, '$broadcast');
    }));

    it('Should trigger \'fillInputCompletion\' if the form is valid and we have a new input\s value', function () {
      var data = {
        isValid: true,
        index: 0,
        value: 25,
        step: 1
      };

      ctrl.handleInputCompletion(data.isValid, data.index, data.value, data.step);

      expect($rootScope.$broadcast)
          .toHaveBeenCalledWith('fillInputCompletion', {value: data.value, step: data.step});
      expect(ctrl.step1InputStatus[data.index]).toBeTruthy();
      expect(ctrl.disableNextButton).toBeFalsy();
    });

    it('Should not trigger \'fillInputCompletion\' when the form is valid but we did not changed the input\'s value', function () {
      var data = {
        isValid: true,
        index: 0,
        value: 25,
        step: 1
      };

      ctrl.step1InputStatus[data.index] = true;

      ctrl.handleInputCompletion(data.isValid, data.index, data.value, data.step);

      expect($rootScope.$broadcast.calls.any()).toBeFalsy();
      expect(ctrl.step1InputStatus[data.index]).toBeTruthy();
      expect(ctrl.disableNextButton).toBeFalsy();
    });

    it('Should trigger \'drainInputCompletion\' when the form is invalid after we changed the input\'s value', function () {
      var data = {
        isValid: false,
        index: 0,
        value: 25,
        step: 1
      };

      ctrl.step1InputStatus[data.index] = true;

      ctrl.handleInputCompletion(data.isValid, data.index, data.value, data.step);

      expect($rootScope.$broadcast)
          .toHaveBeenCalledWith('drainInputCompletion', {value: data.value, step: data.step});
      expect(ctrl.step1InputStatus[data.index]).toBeFalsy();
      expect(ctrl.disableNextButton).toBeTruthy();
    });

    it('Should trigger no events when the form is invalid and we did not changed the input\'s value', function () {
      var data = {
        isValid: false,
        index: 0,
        value: 25,
        step: 1
      };

      ctrl.step1InputStatus[data.index] = false;

      ctrl.handleInputCompletion(data.isValid, data.index, data.value, data.step);

      expect($rootScope.$broadcast.calls.any()).toBeFalsy();
      expect(ctrl.step1InputStatus[data.index]).toBeFalsy();
      expect(ctrl.disableNextButton).toBeTruthy();
    });
  });

  describe('Testing radio button handling for form completion', function () {
    beforeEach(inject(function () {
      $scope = $rootScope.$new();
      ctrl = $controller('homepageController', {
        $scope: $scope
      });
      spyOn($rootScope, '$broadcast');
    }));

    it('Should trigger \'fillInputCompletion\' after a radio button is selected', function () {
      var data = {
        value: 25,
        step: 2
      };

      ctrl.step2.selectedRadio = 1;

      ctrl.handleRadioSelect(data.value, data.step);

      expect($rootScope.$broadcast)
          .toHaveBeenCalledWith('fillInputCompletion', {value: data.value, step: data.step});
    });

    it('Should not trigger \'fillInputCompletion\' if we did not selected a radio button', function () {
      var data = {
        value: 25,
        step: 2
      };

      ctrl.handleRadioSelect(data.value, data.step);

      expect($rootScope.$broadcast.calls.any()).toBeFalsy();
    });
  });

  describe('Testing transition between tabs', function () {
    beforeEach(inject(function () {
      $scope = $rootScope.$new();
      ctrl = $controller('homepageController', {
        $scope: $scope
      });
      spyOn($rootScope, '$broadcast');
    }));

    it('Should increase the tab\'s id', function () {
      var oldValue = ctrl.tabSelected;

      ctrl.nextTab();

      expect(ctrl.tabSelected).toBeGreaterThan(oldValue);
    });

    it('Should decrease the tab\'s id if it is greater than 0', function () {
      ctrl.tabSelected++;
      var oldValue = ctrl.tabSelected;

      ctrl.previousTab();

      expect(oldValue).toBeGreaterThan(ctrl.tabSelected);
    });

    it('Should not decrease the tab\'s id if it is equal to 0', function () {
      var oldValue = ctrl.tabSelected;

      ctrl.previousTab();

      expect(oldValue).toEqual(ctrl.tabSelected);
    });
  });

  describe('Testing updating all form\'s status', function () {
    beforeEach(inject(function () {
      $scope = $rootScope.$new();
      ctrl = $controller('homepageController', {
        $scope: $scope
      });
      spyOn($rootScope, '$broadcast');
    }));

    it('Should trigger \'fillInputCompletion\' twice if the values were updated', function () {
      var data = {
        value: 100,
        step1: 1,
        step2: 2,
        inputStatus: [ true, true, true, true ]
      };

      ctrl.updateForms();

      expect($rootScope.$broadcast)
          .toHaveBeenCalledWith('fillInputCompletion', {value: data.value, step: data.step1});
      expect($rootScope.$broadcast)
          .toHaveBeenCalledWith('fillInputCompletion', {value: data.value, step: data.step2});
      expect(ctrl.disableNextButton).toBeFalsy();
      expect(ctrl.step1InputStatus).toEqual(data.inputStatus);
    });
  });
});
