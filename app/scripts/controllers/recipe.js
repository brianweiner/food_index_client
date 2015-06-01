'use strict';

angular.module('timelineApp')
  .controller('RecipeCtrl', function ($scope, Recipe, $stateParams) {
    Recipe.get({id: $stateParams.recipeId}, function(recipe){
      $scope.recipe = recipe.recipe;
    });
  });
