(function () {
  "use strict";

  angular.module('radStatApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .when('/app', {
          templateUrl: 'views/app.html',
          controller: 'AppCtrl'
        })
        .otherwise({
          redirectTo: '/login'
        });
    });

})();