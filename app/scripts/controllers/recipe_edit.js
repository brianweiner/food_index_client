'use strict';

angular.module('timelineApp')
  .controller('RecipeEditCtrl', function ($scope, Recipe, $stateParams, Auth, $location, FoodElement) {

    $scope.loadUserAndRecipe = function(){
      $scope.show = {};
      $scope.user = Auth.user;
      Recipe.get({id: $stateParams.recipeId}, function(data){
        $scope.recipe = data.recipe;
        $scope.localRecipe = {};
        $scope.localRecipe.name = $scope.recipe.name;
        $scope.localRecipe.description = $scope.recipe.description;
        $scope.queryForConnections();
      });
      FoodElement.mainIngredients({}, function(data){
        $scope.mainIngredients = data.foodElements;
      });

      $scope.ingredient = {};
      $scope.step = {};
    };

    $scope.cancel = function(area){
      $scope.show[area] = false;
    };

    $scope.enable = function(area){
      $scope.show[area] = true;
    };

    $scope.setIngredient = function(element){
      if(element !== undefined){
        if(element.originalObject){
          $scope.ingredient.name = element.originalObject.name;
          $scope.ingredient.foodElementId = element.originalObject.id;
        }
        else{
          $scope.ingredient.name = element.name;
          $scope.ingredient.foodElementId = element.foodElementId;
        }
        
        $scope.enable('add_ingredient');
      }
    };

    $scope.updateRecipe = function(){
      Recipe.save({ recipe: $scope.localRecipe, id: $scope.recipe.id }, function(data){
        angular.extend($scope.recipe, data.recipe);
        $scope.cancel('edit_title_or_description');
      });
    };

    $scope.submitRecipeIngredient = function(){
      Recipe.addRecipeIngredient(
        {
          recipeIngredient: {
            food_element_id: $scope.ingredient.foodElementId,
            unit: $scope.ingredient.unit,
            amount: $scope.ingredient.amount 
          },
          id: $scope.recipe.id
        },
        function(data){
          $scope.recipe.recipeIngredients = $scope.recipe.recipeIngredients.concat(data);
          $scope.ingredient = {};
          $scope.cancel('add_ingredient');
          $scope.queryForConnections();
      });
    };

    $scope.submitRecipeStep = function(){
      Recipe.addRecipeStep({recipeStep: $scope.step, id: $scope.recipe.id}, function(data){
        $scope.recipe.recipeSteps = $scope.recipe.recipeSteps.concat(data);
        $scope.step = {};
        $scope.cancel('add_step');
      });
    };

    $scope.deleteRecipe = function(){
      Recipe.delete({id: $scope.recipe.id}, function(data){
        $location.path('recipes');
      });
    };

    $scope.queryForConnections = function(){
      if($scope.recipe.recipeIngredients.length > 0){
        FoodElement.ingredientConnections({primaryFoodElementId: $scope.recipe.recipeIngredients[0].foodElementId}, function(data){
          $scope.ingredientConnections = data.foodElementConnections;
        });
      }
    };

    $scope.filterAlreadyAdded = function(item) {
      var ingredients = $scope.recipe.recipeIngredients;
      for(var i=0; i<ingredients.length; i++){
        if(ingredients[i].foodElementId === item.foodElementId){
          return false;
        }
      }
      return true;
    };
  });
