(function () {
  "use strict";

  angular.module('radStatApp')
    .value('Data', {
      token: '',
      links: {
        login: 'loginUrl',
        register: 'registerUrl'
      }
    });

})();