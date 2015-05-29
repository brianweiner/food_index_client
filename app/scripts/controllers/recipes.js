'use strict';

angular.module('timelineApp')
  .controller('RecipesCtrl', function ($scope, Recipe) {
    $scope.recipes = Recipe.query(function(recipes) {
      $scope.recipes = recipes.recipes
    }); 
  });
