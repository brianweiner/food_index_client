'use strict';

angular.module('timelineApp')
  .controller('NavCtrl', function ($rootScope,$scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.logout = function(){
      Auth.logout(
        function() {
          //maybe a flash message
            //$location.path('/');
        },
        function(err) {
          $location.path('/');
      });
    }
  });
