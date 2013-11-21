'use strict';

describe('Controller: AuthCtl', function () {

  // load the controller's module
  beforeEach(module('timelineApp'));

  var AuthCtrl, $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope
    });
  }));

  it('should have a login function defined'), function() {
    expect(scope.login()).toBeDefined();
  }
  it('should login with email and password', function() {
    $httpBackend.when('POST', '/api/v1/users/sign_in.json').respond({user:{id: 1, email: 'brian@320ny.com', authentication_token: '439jaasdj'}});
    scope.user.email = "brian@320ny.com";
    scope.user.password = "monkey";
    scope.login();
    $httpBackend.flush();

    expect(scope.current_user).toBeDefined();
  });
});
