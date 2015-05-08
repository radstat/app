(function () {
  "use strict";

  angular.module('radStatApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: 'views/login.html'
        })
        .when('/app', {
          templateUrl: 'views/app.html'
        })
        .otherwise({
          redirectTo: '/login'
        });
    });

})();