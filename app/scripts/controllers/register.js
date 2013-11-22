'use strict';

angular.module('timelineApp')
  .controller('RegisterCtrl', function ($scope, $location, Auth) {
    $scope.user={};
    $scope.show = {};
    $scope.user.email = "";
    $scope.user.password = "";
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.signup = function(){
      Auth.register(
        { user: $scope.user },
        function() {
            $location.path('/');
        },
        function(err) {
            $rootScope.error = err;
      });
    }
  });