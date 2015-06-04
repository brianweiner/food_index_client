'use strict';

angular.module('timelineApp')
  .controller('RecipesCtrl', function ($scope, Recipe) {
    $scope.loadRecipesAndAssignDefaults = function(){
      $scope.show = {};
      $scope.show.browseMode = true;
      $scope.show.recipeMode = false;
      $scope.recipes = Recipe.query(function(recipes) {
        $scope.recipes = recipes.recipes;
      });
    };

    $scope.toggleBrowseAndRecipeMode = function(){
      $scope.show.browseMode = false;
      $scope.show.recipeMode = true;
    };
    
  });
