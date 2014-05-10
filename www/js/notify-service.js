'use strict';

angular.module('myApp.notifyService', ['fsCordova'])
    .factory('Notify', ['CordovaService',
        function (CordovaService) {
          return {
            beep: function() {
              CordovaService.ready.then(function() {
                console.log("Beep beeo");
                navigator.notification.beep(2);
              });
            },
            vibrate: function() {
              CordovaService.ready.then(function() {
                console.log("brrrr brbbrbr brbrbr");
                navigator.notification.vibrate(300);
              });
            }
          }
        }]);