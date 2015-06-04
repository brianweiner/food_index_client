'use strict';

angular.module('timelineApp').directive('recipeIngredientList', [function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/recipes/ingredient_list.html',
    scope: {
      ingredients : '=ingredients'
    }
  };

}]);
