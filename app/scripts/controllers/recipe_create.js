'use strict';

angular.module('timelineApp')
  .controller('RecipeCreateCtrl', function ($scope, Recipe, $stateParams, Auth) {
    $scope.recipe = {};
    $scope.user = Auth.user;
    $scope.recipe.user_id = $scope.user.id;


    $scope.create_recipe_step_one = function(){
      Recipe.create({recipe: $scope.recipe});
    }
  });
