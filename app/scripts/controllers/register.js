'use strict';

angular.module('timelineApp')
  .controller('RegisterCtrl', function ($scope, $http) {
    $scope.user={};
    $scope.show = {};
    $scope.user.email = "";
    $scope.user.password = "";

    $scope.signup = function(){
      $http.post('/api/v1/users.json', {user: $scope.user}).then(function(response){
        if (response.status === 200){
          $scope.current_user = response.data.user;
          console.log($scope.current_user);
        }
      });
    }
  });