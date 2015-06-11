'use strict';

angular.module('timelineApp')
  .factory('Auth', function ($http, $cookieStore) {
    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        currentUser = $cookieStore.get('user') || { email: '', role: userRoles.public };


    function changeUser(user) {
      angular.extend(currentUser, user);
      $cookieStore.put('user', user);
    }

    function setHeader(authToken, email){
      $http.defaults.headers.common['Authorization']='Token token="'+authToken+'", email="'+email+'"';
    }

    function clearHeader(){
      delete $http.defaults.headers.common['Authorization'];
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined){
          role = currentUser.role;
        }
        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function(user) {
        if(user === undefined){
          user = currentUser;
        }
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      register: function(user, success, error) {
        $http.post('/api/v1/users', user).success(function(res) {
          res.user.role = userRoles.user;
          setHeader(res.user.authenticationToken, res.user.email);
          changeUser(res.user);
          success();
        }).error(error);
      },
      login: function(user, success, error) {
        $http.post('/api/v1/users/sign_in', user).success(function(res){
          res.user.role = userRoles.user;
          setHeader(res.user.authenticationToken, res.user.email);
          changeUser(res.user);
          success();
        }).error(error);
      },
      logout: function(success, error) {
        $http.delete('/api/v1/users/sign_out', {'user': {'email':currentUser.email}}).success(function(){
          changeUser({
            email: '',
            role: userRoles.public
          });
          clearHeader();
          success();
        }).error(function(){
          changeUser({
            email: '',
            role: userRoles.public
          });
          clearHeader();
          console.log('server responded with error');
          error();
        });
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });
