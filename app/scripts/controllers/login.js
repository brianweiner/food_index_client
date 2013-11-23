'use strict';

angular.module('timelineApp')
  .controller('LoginCtrl', function ($scope, $location, Auth) {
    $scope.user={};
    $scope.show = {};
    $scope.show.form = false;
    $scope.user.email = "";
    $scope.user.password = "";

    $scope.login = function(){
      Auth.login(
        { user: $scope.user },
        function() {
            $location.path('/');
        },
        function(err) {
            $rootScope.error = err;
      });
    }

  });
