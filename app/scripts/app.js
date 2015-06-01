'use strict';

// Authentication extensively influenced by https://github.com/fnakstad/angular-client-side-auth/tree/ui-router




angular.module('timelineApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    var access = routingConfig.accessLevels;


    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        access: access.public
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        access: access.anon
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: access.anon
      })
      .state('create_recipe', {
        url: '/recipe/new',
        templateUrl: 'views/recipes/new.html',
        controller: 'RecipeCreateCtrl',
        access: access.user
      })
      .state('recipes', {
        url: '/recipes',
        templateUrl: 'views/recipes/index.html',
        controller: 'RecipesCtrl',
        access: access.user
      })
      .state('recipes.show', {
        url: '/:recipeId',
        templateUrl: 'views/recipes/show.html',
        controller: 'RecipeCtrl',
        access: access.user
      });
    var interceptor = ['$location', '$q', function($location, $q) {
      function success(response) {
          return response;
      }

      function error(response) {

          if(response.status === 401) {
              $location.path('/login');
              return $q.reject(response);
          }
          else {
              return $q.reject(response);
          }
      }

      return function(promise) {
          return promise.then(success, error);
      }
    }];

    $httpProvider.interceptors.push(interceptor);

    $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  })

    .run(function ($rootScope, $location, $cookieStore, $timeout, $http, Auth) {
      var user = $cookieStore.get('user');
      var auth_token = "";
      if (user) {
        auth_token = user.authentication_token || "";
      }

      if (auth_token != ""){
        $http.defaults.headers.common["Authorization"]='Token token="'+auth_token+'", email="'+user.email+'"';
      }

      $rootScope.$on("$stateChangeStart", function (event, next, current) {
          $rootScope.error = null;
          if (!Auth.authorize(next.access)) {
              if(Auth.isLoggedIn()){
                $timeout(function(){
                  $location.path('/');
                });
              }
              else{
                $timeout(function(){
                  $location.path('/login');
                });
              }
          }
      });

    });
