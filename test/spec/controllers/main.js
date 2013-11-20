'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('timelineApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have a login function defined'), function() {
    expect(scope.login()).toBeDefined();
  }
  it('should login with email and password', function() {
    scope.user.email = "brian@320ny.com";
    scope.user.password = "monkey";
    scope.login();

    expect(scope.current_user).toBeDefined();
  });
});
