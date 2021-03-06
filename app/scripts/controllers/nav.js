'use strict';

angular.module('timelineApp')
  .controller('NavCtrl', function ($rootScope,$scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.logout = function(){
      Auth.logout(
        function() {
          $location.path('/');
        },
        function() {
          $location.path('/');
        }
      );
    };
  });
