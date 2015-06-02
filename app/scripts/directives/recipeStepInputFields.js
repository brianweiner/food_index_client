'use strict';

angular.module('timelineApp').directive('recipeStepInputFields', [function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/recipes/step_input_fields.html',
    scope: {
      step : '=step'
    }
  }

}]);
