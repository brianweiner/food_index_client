'use strict';

angular.module('timelineApp')
  .controller('RecipeEditCtrl', function ($scope, Recipe, $stateParams, Auth, $location, FoodElement) {

    $scope.load_user_and_recipe = function(){
      $scope.show = {};
      $scope.user = Auth.user;
      Recipe.get({id: $stateParams.recipeId}, function(data){
        $scope.recipe = data.recipe;
        $scope.local_recipe = {};
        $scope.local_recipe.name = $scope.recipe.name;
        $scope.local_recipe.description = $scope.recipe.description;
        $scope.query_for_connections();
      });
      FoodElement.main_ingredients({}, function(data){
        $scope.main_ingredients = data.food_elements;
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

    $scope.set_ingredient = function(element){
      if(element != undefined){
        if(element.originalObject){
          $scope.ingredient.name = element.originalObject.name;
          $scope.ingredient.food_element_id = element.originalObject.id;  
        }
        else{
          $scope.ingredient.name = element.name;
          $scope.ingredient.food_element_id = element.food_element_id;
        }
        
        $scope.enable('add_ingredient');  
      }
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
        $scope.query_for_connections();
      });
    }

    $scope.submit_recipe_step = function(){
      Recipe.add_recipe_step({recipe_step: $scope.step, id: $scope.recipe.id}, function(data){
        $scope.recipe.recipe_steps = $scope.recipe.recipe_steps.concat(data);
        $scope.step = {};
        $scope.cancel('add_step');
      });
    }

    $scope.delete_recipe = function(){
      Recipe.delete({id: $scope.recipe.id}, function(data){
        $location.path('recipes');
      });
    }

    $scope.query_for_connections = function(){
      if($scope.recipe.recipe_ingredients.length > 0){
        FoodElement.ingredient_connections({primary_food_element_id: $scope.recipe.recipe_ingredients[0].food_element_id}, function(data){
          $scope.ingredient_connections = data.food_element_connections;
        });
      }
    }

    $scope.filterAlreadyAdded = function(item) {
      var ingredients = $scope.recipe.recipe_ingredients;
      for(var i=0; i<ingredients.length; i++){
        if(ingredients[i].food_element_id == item.food_element_id){
          return false;
        }
      }
      return true;
    };
  });
