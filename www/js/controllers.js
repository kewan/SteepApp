'use strict';

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.timeoutMessage = "Unable to connect. Make sure you are online and please try again later."

        $rootScope.logout = function() {
            window.localStorage.clear();
            window.location = "#/login";
            return false;
        }
    }])
    .controller('LoginCtrl', ['$scope', 'Api', 'Notify', function ($scope, Api, Notify) {

        $scope.doLogin = function() {
            $scope.error = {};
            $scope.loading = true;

            if ( $scope.user === undefined || !$scope.user.username || !$scope.user.password) {
                $scope.error.message = 'Invalid login details';
                Notify.vibrate();
                $scope.loading = false;
                return;
            }

            if($scope.user.username == 'debug' && $scope.user.password == 'showme') {
                alert(Api.env);
                Notify.vibrate();
                $scope.user = {};
                $scope.loading = false;
                return ;
            }

           Api.login($scope.user, loginSuccess, loginError);
        }

        var loginSuccess = function(data, status, headers, config) {
            console.log("Success ", data);
            window.localStorage.setItem("access_token", data.token);
            window.localStorage.setItem("username", $scope.user.username);
            window.location = "#/scan";
         };

        var loginError = function(data, status, headers, config) {
            console.log("Error", data, status, headers, config);
            $scope.error.message = (data) ? data.error : $scope.timeoutMessage;
            Notify.vibrate();
            window.localStorage.clear();
            $scope.loading = false;
         };
    }])
    .controller('ProductCtrl', ['$scope', 'Api', 'Notify', function ($scope, Api, Notify) {

      var userSuccess = function(data, status, headers, config) {
          console.log("Success ", data);
          $scope.user = data;

         //  window.localStorage.setItem("access_token", data.token);
         //  window.localStorage.setItem("username", $scope.user.username);
         //  window.location = "#/scan";
       };

      var userError = function(data, status, headers, config) {
          console.log("Error", data, status, headers, config);
         //  $scope.error.message = (data) ? data.error : $scope.timeoutMessage;
         //  Notify.vibrate();
         //  window.localStorage.clear();
         //  $scope.loading = false;
       };

      Api.user(1, userSuccess, userError);

    }])
    .controller('WishCtrl', ['$scope', 'Api', 'Notify', '$routeParams', function ($scope, Api, Notify, $routeParams) {

       var wishSuccess = function(data, status, headers, config) {
           console.log("Success ", data);
           $scope.wish = data;

           if(!$scope.wish.price) {
             $scope.wish.price = $scope.wish.product.price - 1;
           }
          //  window.localStorage.setItem("access_token", data.token);
          //  window.localStorage.setItem("username", $scope.user.username);
          //  window.location = "#/scan";
        };

       var wishError = function(data, status, headers, config) {
           console.log("Error", data, status, headers, config);
          //  $scope.error.message = (data) ? data.error : $scope.timeoutMessage;
          //  Notify.vibrate();
          //  window.localStorage.clear();
          //  $scope.loading = false;
        };

      Api.wish($routeParams.id, wishSuccess, wishError);

      $scope.saveWish = function() {
          $scope.error = {};
          $scope.loading = true;

          if ( $scope.wish === undefined || !$scope.wish.price) {
              $scope.error.message = 'You have not set a price';
              Notify.vibrate();
              $scope.loading = false;
              return;
          }

          if ( $scope.wish.price >= $scope.wish.product.price) {
            $scope.error.message = 'Your desired price is not less then the current price';
            Notify.vibrate();
            $scope.loading = false;
            return;
          }

        var wishUpdateSuccess = function(data, status, headers, config) {
            console.log("Success", data, status, headers, config);
           //  $scope.error.message = (data) ? data.error : $scope.timeoutMessage;
           //  Notify.vibrate();
           //  window.localStorage.clear();
            $scope.loading = false;
            window.location = "#/products";
         };

         var wishUpdateError = function(data, status, headers, config) {
             console.log("Error", data, status, headers, config);
             $scope.error.message = (data) ? data.error : $scope.timeoutMessage;
             Notify.vibrate();
            //  window.localStorage.clear();
             $scope.loading = false;
          };

          Api.updateWish($scope.wish.id, {price: $scope.wish.price, latitude: 123.45, longitude: 456.89}, wishUpdateSuccess, wishUpdateError);
      }
    }])
    .controller('ScanCtrl', ['$scope', 'Scanner', 'Notify', 'Api', function ($scope, Scanner, Notify, Api) {

        // if (!window.localStorage.getItem("access_token")) {
        //     window.location = "#/login";
        //     return false;
        // }

        // $scope.user  = { username: window.localStorage.getItem("username") };

        $scope.scan = function() {
           $scope.error = {};
           $scope.loading = true;
           Scanner.scan(scanSuccess, scanFailure);
          // scanSuccess({text: '5051214764191'})
        }

        var scanSuccess = function (result) {
           console.log("Scanner result: \n" +
                "text: " + result.text);

            if (result.text) {
                Api.createWish({ean: result.text, user_id: 1}, createWishSuccess, createWishFailure);
                // console.log("redirect to wish");
            } else {
                $scope.error.message = "Can not read barcode";
            }

            if ($scope.error.message) {
                Notify.vibrate();
                $scope.loading = false;
            }

            $scope.$apply();
        }

        var scanFailure = function (error) {
            $scope.error.message = "Scanning failed: " + error;
            $scope.loading = false;
            Notify.vibrate();
            $scope.$apply();
        }

        var createWishSuccess = function(data, status, headers, config) {
            console.log("Success", data, status, headers, config);
            window.location = "#/wish/"+data.id;
         }

         var createWishFailure = function(data, status, headers, config) {
             console.log("Error", data, status, headers, config);
             $scope.error.message = (data) ? data.error : $scope.timeoutMessage;
             $scope.loading = false;
             Notify.vibrate();
             $scope.$apply();
            //  if (status == 401) {
            //      //unauthorised invalid token
            //      alert(data.error);
            //      window.localStorage.clear();
            //      window.location = "#/login";
            //  }
          }
    }]);
