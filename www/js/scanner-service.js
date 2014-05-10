'use strict';

angular.module('myApp.scannerService', ['fsCordova'])
    .factory('Scanner', ['CordovaService',
        function (CordovaService) {
          return {
            scan: function(onSuccess, onFailure) {
              CordovaService.ready.then(function() {
                var scanner = cordova.require("cordova/plugin/BarcodeScanner");
                scanner.scan( onSuccess, onFailure );
              });
            }
          }
        }]);