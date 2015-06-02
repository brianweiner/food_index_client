'use strict';

angular.module('timelineApp')
  .controller('RecipeCreateCtrl', function ($scope, Recipe, $stateParams, Auth) {

    $scope.load_user_and_assign_id = function(){
      $scope.user = Auth.user;
      $scope.recipe = {};
      $scope.recipe.user_id = $scope.user.id;
      $scope.current_step = 1;
    }


    $scope.create_recipe_step_one = function(){
      Recipe.create({recipe: $scope.recipe}, function(recipe){
        // create blank ingredient with recipe_id
        $scope.ingredient = {};
        $scope.recipe = recipe;
        $scope.current_step = 2;
      });
    }

    $scope.submit_recipe_ingredient = function(){
      Recipe.add_recipe_ingredient({recipe_ingredient: $scope.ingredient}, function(){

      });

    }

    $scope.submit_recipe_step = function(){

    }
  });
