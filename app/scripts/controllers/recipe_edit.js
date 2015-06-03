'use strict';

angular.module('timelineApp')
  .controller('RecipeEditCtrl', function ($scope, Recipe, $stateParams, Auth) {

    $scope.load_user_and_recipe = function(){
      $scope.show = {};
      $scope.user = Auth.user;
      $scope.recipe = Recipe.get({id: $stateParams.recipeId}, function(data){
        $scope.recipe = data.recipe;
        $scope.local_recipe = {};
        $scope.local_recipe.name = $scope.recipe.name;
        $scope.local_recipe.description = $scope.recipe.description;
      });

      $scope.ingredient = {};
      $scope.step = {};
    }

    $scope.cancel = function(area){
      $scope.show[area] = false;
    }

    $scope.enable = function(area){
      $scope.show[area] = true;
    }

    $scope.update_recipe = function(){
      Recipe.save({ recipe: $scope.local_recipe, id: $scope.recipe['id'] }, function(data){
        angular.extend($scope.recipe, data.recipe);
        $scope.cancel('edit_title_or_description');
      });
    }

    $scope.submit_recipe_ingredient = function(){
      Recipe.add_recipe_ingredient({recipe_ingredient: $scope.ingredient, id: $scope.recipe.id}, function(data){
        $scope.recipe.recipe_ingredients = $scope.recipe.recipe_ingredients.concat(data);
        $scope.ingredient = {};
        $scope.cancel('add_ingredient');
      });
    }

    $scope.submit_recipe_step = function(){
      Recipe.add_recipe_step({recipe_step: $scope.step, id: $scope.recipe.id}, function(data){
        $scope.recipe.recipe_steps = $scope.recipe.recipe_steps.concat(data);
        $scope.step = {};
        $scope.cancel('add_step');
      });
    }
  });
