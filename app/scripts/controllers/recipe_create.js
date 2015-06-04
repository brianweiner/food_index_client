'use strict';

angular.module('timelineApp')
  .controller('RecipeCreateCtrl', function ($scope, Recipe, $stateParams, Auth, FoodElement) {

    $scope.load_user_and_assign_id = function(){
      $scope.user = Auth.user;
      $scope.recipe = {};
      $scope.recipe.user_id = $scope.user.id;
      $scope.current_step = 1;
      $scope.main_ingredients = {};
    }

    $scope.load_main_ingredients = function(){
      FoodElement.main_ingredients({}, function(data){
        $scope.main_ingredients = data.food_elements;
      });
    }

    $scope.create_recipe_step_one = function(){
      Recipe.create({recipe: $scope.recipe}, function(data){
        // create blank ingredient with recipe_id
        $scope.ingredient = {};
        $scope.recipe = data.recipe;
        $scope.current_step = 2;
        $scope.load_main_ingredients()
      });
    }


  });
