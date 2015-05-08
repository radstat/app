(function () {
  "use strict";

  angular.module('radStatApp')
    .controller('AppCtrl', function ($scope, Data) {
      $scope.token = Data.token;
    });

})();