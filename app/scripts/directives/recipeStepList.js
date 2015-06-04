'use strict';

angular.module('timelineApp').directive('recipeStepList', [function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/recipes/step_list.html',
    scope: {
      steps : '=steps',
      editable: '@'
    }
  };

}]);
