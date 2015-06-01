'use strict';

describe('Controller: RecipesCtrl', function () {

  // load the controller's module
  beforeEach(module('timelineApp'));

  var RecipesCtrl, $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,_$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    RecipesCtrl = $controller('RecipesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of recipes to the scope', function () {
    $httpBackend.when('GET','/api/v1/recipes').respond({ recipes: [{id: 1, name: 'Recipe', description: 'New Recipe'}]})
    expect(scope).toBe(1);
  });
});
