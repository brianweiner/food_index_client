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
      $scope.add_food_element = function(element){
        if(element != undefined){
          $scope.ingredient.food_element_id = element.originalObject.id
        }
        else{
          $scope.ingredient.food_element_id = '';
        } 
      }
    }
  }

}]);
