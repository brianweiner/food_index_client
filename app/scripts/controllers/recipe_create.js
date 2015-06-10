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
      var recipe = $scope.recipe;
      Recipe.create({recipe: {
                       name: recipe.name,
                       description: recipe.description,
                       user_id: recipe.userId
                      }
                    }, function(data){
        // create blank ingredient with recipe_id
        $location.path('/recipe/'+data.recipe.id+'/edit');
      });
    };


  });
