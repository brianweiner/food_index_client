'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('timelineApp'));

  var MainCtrl, $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.when('POST', '/api/v1/users/sign_in').respond({user:{id: 1, email: 'brian@320ny.com', authentication_token: '439jaasdj'}});
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
    $httpBackend.flush();

    expect(scope.current_user).toBeDefined();
  });
});
