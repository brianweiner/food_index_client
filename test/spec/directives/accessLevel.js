'use strict';

describe('Directive: accessLevel', function () {

  // load the directive's module
  beforeEach(module('timelineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should show public elements to anon users', inject(function ($compile) {
    element = angular.element("<div class='some-class' access-level='{title: '*', bitMask: '7'}'></div>");
    element = $compile(element)(scope);

    expect(element).toBe('block');
  }));
});
