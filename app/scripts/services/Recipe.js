'use strict';

angular.module('timelineApp').factory('Recipe', function($resource) {
  return $resource('/api/v1/recipes/:id', {id: "@id" },
    { 'get':    {method:'GET'},
      'create': {method:'POST'},
      'save':   {method:'PATCH'},
      'query':  {method:'GET', isArray:false},
      'delete': {method:'DELETE'} }
  );
});
