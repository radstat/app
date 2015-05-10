(function () {
  "use strict";

  angular.module('radStatApp')
    .value('Data', {
      token: '',
      links: {
        base: 'http://52.10.214.187:8000/api',
        login: '/login',
        register: '/register',
        upload: '/upload',
        user: '/user'
      },
      userData: {}
    });

})();