(function () {
  "use strict";

  angular.module('radStatApp')
    .value('Data', {
      token: '',
      links: {
        login: 'http://52.10.214.187:8000/api/login',
        register: 'http://52.10.214.187:8000/api/register'
      }
    });

})();