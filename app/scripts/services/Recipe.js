'use strict';

angular.module('timelineApp').factory('Recipe', function($resource) {
  return $resource('/api/v1/recipes/:id', {id: "@id" },
    {'query': {method: 'GET', isArray: false }}
  ); // Note the full endpoint address
});
