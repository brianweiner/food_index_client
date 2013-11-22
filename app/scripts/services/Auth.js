'use strict';

angular.module('timelineApp')
  .factory('Auth', function ($http, $cookieStore) {
    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { email: '', role: userRoles.public };


    function changeUser(user) {
      angular.extend(currentUser, user);
      $cookieStore.put('user', user);
    };

    function setHeader(auth_token){
      $http.defaults.headers.common["Authorization"]="Token token="+auth_token;
    }

    function clearHeader(){
      delete $http.defaults.headers.common["Authorization"];
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined)
          role = currentUser.role;
        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
      },
      register: function(user, success, error) {
        $http.post('/api/v1/users.json', user).success(function(res) {
          res.user.role = userRoles['user'];
          changeUser(res.user);
          success();
        }).error(error);
      },
      login: function(user, success, error) {
        $http.post('/api/v1/users/sign_in.json', user).success(function(res){
          res.user.role = userRoles['user'];
          setHeader(res.user.authentication_token);
          changeUser(res.user);
          success();
        }).error(error);
      },
      logout: function(success, error) {
        $http.delete('/api/v1/users/sign_out.json', {'user': {'email':currentUser.email}}).success(function(){
          changeUser({
            email: '',
            role: userRoles.public
          });
          clearHeader();
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });
