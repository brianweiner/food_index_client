'use strict';

angular.module('timelineApp')
  .controller('RecipeEditCtrl', function ($scope, Recipe, $stateParams, Auth) {

    $scope.load_user_and_recipe = function(){
      $scope.show = {};
      $scope.user = Auth.user;
      $scope.recipe = Recipe.get({id: $stateParams.recipeId}, function(data){
        $scope.recipe = data.recipe;
      });
      $scope.ingredient = {};
      $scope.step = {};
    }

    $scope.edit_title_and_description = function(){
      $scope.show.edit_title_or_description = true;
    }

    $scope.add_ingredient = function(){
      $scope.show.add_ingredient = true;
    }

    $scope.add_step = function(){
      $scope.show.add_step = true;
    }

    $scope.update_recipe = function(){
      Recipe.save({recipe: $scope.recipe, id: $scope.recipe.id}, function(data){
        $scope.show.edit_title_or_description = false;
      })
    }

    $scope.cancel = function(area){
      $scope.show[area] = false;
    }

    $scope.submit_recipe_ingredient = function(){
      Recipe.add_recipe_ingredient({recipe_ingredient: $scope.ingredient, id: $scope.recipe.id}, function(data){
        $scope.recipe.recipe_ingredients = $scope.recipe.recipe_ingredients.concat(data);
      });
      $scope.show.add_ingredient = false;
      $scope.ingredient = {};
    }

    $scope.submit_recipe_step = function(){
      Recipe.add_recipe_step({recipe_step: $scope.step, id: $scope.recipe.id}, function(data){
        $scope.recipe.recipe_steps = $scope.recipe.recipe_steps.concat(data);
      });
      $scope.step = {};
      $scope.show.add_step = false;
    }
  });
