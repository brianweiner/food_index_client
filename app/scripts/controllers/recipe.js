'use strict';

angular.module('timelineApp')
  .controller('RecipeCtrl', function ($scope, Recipe, $stateParams) {
    Recipe.get({id: $stateParams.recipeId}, function(data){
      $scope.recipe = data.recipe;
    });
  });
