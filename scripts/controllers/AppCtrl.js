(function () {
  "use strict";

  angular.module('radStatApp')
    .controller('AppCtrl', function ($scope, Data, $location, $mdMedia, $http, $mdDialog, $mdToast) {
      $scope.containerWidth = '100%';
      $scope.data = Data;
      $scope.state = 'loadingUserData';
      $scope.uploader = {
        moduleName: ''
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

      // Token Availability
      if (!Data.token) {
        $location.url('/login');
      } else {

        // Fetch data
        $http.post(Data.links.base + Data.links.user, {
          token: Data.token
        })
          .success(function (response) {
            Data.userData = response;
            $scope.state = 'ready';
          })
          .error(function (response) {

            if (response && response.error == 'token') {
              $scope.openDialog(null, 'Login again', 'Okay', function () {
                Data.token = '';
                $location.url('/login');
              });
              return;
            }

            $scope.openDialog(null, response || 'Unknown Error', 'Okay', function () {
              Data.token = '';
              $location.url('/login');
            });

          });

      }

      //  Methods

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

      $scope.upload = function ($event) {

        var file = document.getElementById('file');

        var validTypes = [
          'application/x-compressed',
          'application/x-zip-compressed',
          'application/zip',
          'multipart/x-zip'
        ];

        if ($scope.uploader.moduleName == '') {
          $scope.openToast('Module name is Empty');
          return;
        }

        if (!file.files[0]) {
          $scope.openToast('No files are selected.');
          return;
        }

        if (file.files[1]) {
          $scope.openToast('Select only one zip file.');
          return;
        }

        if (validTypes.indexOf(file.files[0].type) == -1) {
          $scope.openToast('Select a zip file.');
          return;
        }

        $scope.state = 'uploading';

        var fd = new FormData();
        fd.append('token', Data.token);
        fd.append('moduleName', $scope.uploader.moduleName);
        fd.append('file', file.files[0]);

        $http.post(Data.links.base + Data.links.upload, fd, {
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        }).success(function (response) {

          $scope.openToast('Uploaded Successfully.');
          $scope.uploader.moduleName = '';
          $scope.state = 'ready';

        }).error(function (response) {

          $scope.openDialog($event, 'Couldn\'t Upload.', 'Okay');
          $scope.state = 'ready';

        });

      };

      $scope.uploadEnterHandler = function ($event) {
        if($event.which == 13){
          $scope.upload($event);
        }
      }

    });

})();