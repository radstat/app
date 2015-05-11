(function () {
  "use strict";

  angular.module('radStatApp')
    .controller('LoginCtrl', function ($scope, $mdMedia, $mdToast, $http, Data, $location, $mdDialog) {
      $scope.containerWidth = '100%';
      $scope.loginDetails = {
        username: '',
        password: ''
      };
      $scope.registrationDetails = {
        name: '',
        username: '',
        password: '',
        email: '',
        contact: '',
        work: ''
      };

      // Responsive Watcher
      $scope.$watch(function () {
        if ($mdMedia('sm')) return '100%';
        if ($mdMedia('md')) return '600px';
        if ($mdMedia('lg')) return '960px';
        return '1200px';
      }, function (width) {
        $scope.containerWidth = width;
      });

      // Open Toast
      $scope.openToast = function (content) {
        $mdToast.show(
          $mdToast.simple()
            .content(content)
            .position('top right')
            .hideDelay(3000)
        );
      };

      // Open Dialog
      $scope.openDialog = function (ev, content, ok, callback) {
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
        if ($scope.loginDetails.username == '') {
          $scope.openToast('Username is empty');
          return;
        }

        // Password Check
        if ($scope.loginDetails.password == '') {
          $scope.openToast('Password is empty');
          return;
        }

        // Submit
        $http.post(Data.links.base + Data.links.login, $scope.loginDetails)
          .success(function (response) {

            Data.token = response.token;
            $location.url('/app');

          })
          .error(function (response) {

            if (response && response.error == 'username') {
              $scope.openDialog($event, 'Username is not registered', 'Okay', function () {
                $scope.loginDetails.username = '';
                $scope.loginDetails.password = '';
              });
              return;
            }

            if (response && response.error == 'password') {
              $scope.openDialog($event, 'Password is incorrect', 'Okay', function () {
                $scope.loginDetails.password = '';
              });
              return;
            }

            $scope.openDialog($event, response || 'Unknown Error', 'Okay');

          });

      };

      // Register
      $scope.register = function ($event) {

        // Name Check
        if ($scope.registrationDetails.name == '') {
          $scope.openToast('Name is empty');
          return;
        }

        // Username Check
        if ($scope.registrationDetails.username == '') {
          $scope.openToast('Username is empty');
          return;
        }

        // Password Check
        if ($scope.registrationDetails.password == '') {
          $scope.openToast('Password is empty');
          return;
        }

        // Email Check
        if ($scope.registrationDetails.email == '') {
          $scope.openToast('Email is empty');
          return;
        }

        // Submit
        $http.post(Data.links.base + Data.links.register, $scope.registrationDetails)
          .success(function (response) {

            Data.token = response.token;
            $location.url('/app');

          })
          .error(function (response) {

            if (response && response.error == 'username') {
              $scope.openDialog($event, 'Username is taken already.', 'Okay', function () {
                $scope.registrationDetails.username = '';
                $scope.registrationDetails.password = '';
              });
              return;
            }

            $scope.openDialog($event, response || 'Unknown Error', 'Okay');

          });

      };

      $scope.loginEnterHandler = function ($event) {
        if($event.which == 13){
          $scope.login($event);
        }
      };

      $scope.registerEnterHandler = function ($event) {
        if($event.which == 13){
          $scope.register($event);
        }
      };

    });

})();