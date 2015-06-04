'use strict';

angular.module('timelineApp')
  .controller('RecipeCreateCtrl', function ($scope, Recipe, $stateParams, Auth, $location) {

    $scope.loadUserAndAssignId = function(){
      $scope.user = Auth.user;
      $scope.recipe = {};
      $scope.recipe.userId = $scope.user.id;
      $scope.mainIngredients = {};
    };

    $scope.createRecipe = function(){
      Recipe.create({recipe: $scope.recipe}, function(data){
        // create blank ingredient with recipe_id
        $location.path('/recipe/'+data.recipe.id+'/edit');
      });
    };


  });
