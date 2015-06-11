'use strict';

angular.module('timelineApp')
  .controller('RegisterCtrl', function ($scope, $location, Auth) {
    $scope.user={};
    $scope.show = {};
    $scope.show.email_error = false;
    $scope.show.password_error = false;
    $scope.user.email = '';
    $scope.user.password = '';
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.signup = function(){
      Auth.register({ user: $scope.user },
        function() {
          $location.path('/');
        },
        function(err) {
          $scope.show.password_error = err.password[0];
          $scope.show.email_error = err.email[0];
        }
      );
    };
  });