'use strict';

angular.module('timelineApp').directive('recipeIngredientInputFields', [function() {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/recipes/ingredient_input_fields.html',
    scope: {
      ingredient : '=ingredient'
    },
    controller: function($scope){
      $scope.addFoodElement = function(element){
        if(element !== undefined){
          $scope.ingredient.foodElementId = element.originalObject.id;
        }
        else{
          $scope.ingredient.foodElementId = '';
        }
      };
    }
  };

}]);
