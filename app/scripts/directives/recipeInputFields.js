'use strict';

angular.module('timelineApp').directive('recipeInputFields', [function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/recipes/input_fields.html',
    scope: {
      recipe : '=recipe'
    }
  }

}]);
