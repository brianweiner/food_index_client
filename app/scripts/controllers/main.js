'use strict';

angular.module('timelineApp')
  .controller('MainCtrl', function ($scope, $http) {
  $scope.user={};
  $scope.show = {};
  $scope.show.form = false;
  $scope.user.email = "";
  $scope.user.password = "";

  $scope.login = function(){
    $http.post('/api/v1/users/sign_in', {user: $scope.user}).then(function(response){
      if (response.status === 200){
        $scope.current_user = response.data.user;
      }
    });
  }

  });
