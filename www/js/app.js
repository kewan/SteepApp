'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'myApp.controllers',
    'myApp.directives',
    'fsCordova',
    'myApp.apiService',
    'myApp.scannerService',
    'myApp.notifyService'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/scan', {templateUrl: 'partials/scan.html', controller: 'ScanCtrl'});
    $routeProvider.when('/wish', {templateUrl: 'partials/wish.html', controller: 'WishCtrl'});
    $routeProvider.otherwise({redirectTo: '/scan'});
}]);
