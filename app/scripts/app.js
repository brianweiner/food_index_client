'use strict';

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
      .state('logout', {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
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

    $httpProvider.responseInterceptors.push(interceptor);
  })
    .run(function ($rootScope, $location, $cookieStore, $http, Auth) {
      var user = $cookieStore.get('user');
      var auth_token = "";
      if (user) {
        auth_token = user.authentication_token || "";
      }

      if (auth_token != ""){
        $http.defaults.headers.common["Authorization"]="Token token="+auth_token;
      }

      $rootScope.$on("$stateChangeStart", function (event, next, current) {
          $rootScope.error = null;
          if (!Auth.authorize(next.access)) {
              if(Auth.isLoggedIn()) $location.path('/');
              else                  $location.path('/login');
          }
      });

    });
