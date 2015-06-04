'use strict';

angular.module('timelineApp').factory('FoodElement', function($resource) {
  return $resource('/api/v1/food_elements/:id', {id: "@id" },
    { 'main_ingredients': {method:'GET', url: 'api/v1/food_elements/main_ingredients' },
      'ingredient_connections': {method: 'GET', url: 'api/v1/food_elements/ingredient_connections' }
    }
  );
});
