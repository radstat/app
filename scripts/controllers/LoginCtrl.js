(function () {
  "use strict";

  angular.module('radStatApp')
    .controller('LoginCtrl', function ($scope, $mdMedia, $mdToast, $http, Data, $location, $mdDialog) {
      $scope.containerWidth = '100%';
      $scope.loginDetails = {
        credentials : {
          username: '',
          password: ''
        }
      };
      $scope.registration = {
        details: {
          name: '',
          username: '',
          password: '',
          email: '',
          contact: '',
          work: ''
        }
      };

      // Responsive Watcher
      $scope.$watch(function() {
        if($mdMedia('sm')) return '100%';
        if($mdMedia('md')) return '600px';
        if($mdMedia('lg')) return '960px';
        return '1200px';
      }, function(width) {
        $scope.containerWidth = width;
      });

      //  Methods

      // Open Toast
      $scope.openToast = function(content) {
        $mdToast.show(
          $mdToast.simple()
            .content(content)
            .position('top right')
            .hideDelay(3000)
        );
      };

      // Open Dialog
      $scope.openDialog = function(ev, content, ok, callback) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(content)
            .ariaLabel('Error')
            .ok(ok)
            .targetEvent(ev)
        ).then(callback);
      };

      // Login
      $scope.login = function ($event) {

        // Username Check
        if($scope.loginDetails.credentials.username == ''){
          $scope.openToast('Username is empty');
          return;
        }

        // Password Check
        if($scope.loginDetails.credentials.password == ''){
          $scope.openToast('Password is empty');
          return;
        }

        // Submit
        $http.post(Data.links.base + Data.links.login, $scope.loginDetails.credentials)
          .success(function (response) {

            Data.token = response.token;
            $location.url('/app');

          })
          .error(function (response) {

            if(response && response.error == 'username'){
              $scope.openDialog($event, 'Username is not registered', 'Okay', function () {
                $scope.loginDetails.credentials.username = '';
                $scope.loginDetails.credentials.password = '';
              });
              return;
            }

            if(response && response.error == 'password'){
              $scope.openDialog($event, 'Password is incorrect', 'Okay', function () {
                $scope.loginDetails.credentials.password = '';
              });
              return;
            }

            $scope.openDialog($event, response || 'Unknown Error', 'Okay');

          });

      };

      // Register
      $scope.register = function ($event) {

        // Name Check
        if($scope.registration.details.name == ''){
          $scope.openToast('Name is empty');
          return;
        }

        // Username Check
        if($scope.registration.details.username == ''){
          $scope.openToast('Username is empty');
          return;
        }

        // Password Check
        if($scope.registration.details.password == ''){
          $scope.openToast('Password is empty');
          return;
        }

        // Email Check
        if($scope.registration.details.email == ''){
          $scope.openToast('Email is empty');
          return;
        }

        // Submit
        $http.post(Data.links.base + Data.links.register, $scope.registration.details)
          .success(function (response) {

            Data.token = response.token;
            $location.url('/app');

          })
          .error(function (response) {

            if(response && response.error == 'username'){
              $scope.openDialog($event, 'Username is already taken.', 'Okay', function () {
                $scope.registration.details.username = '';
                $scope.registration.details.password = '';
              });
              return;
            }

            $scope.openDialog($event, response || 'Unknown Error', 'Okay');

          });

      };

    });

})();