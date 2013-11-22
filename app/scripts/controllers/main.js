'use strict';

angular.module('timelineApp')
  .controller('MainCtrl', function ($scope, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

  });
