'use strict';

angular.module('myApp.apiService', [])
    .factory('Api', ['$http',
        function ($http) {
          return {

            env: 'development',

            options: {
              development: { url: "http://steep.ngrok.com", version: 'v1' },
              staging:     { url: "https://stg.steepapp.com", version: 'v1' },
              production:  { url: "https://www.steepapp.com", version: 'v1' }
            },

            currentEnv: function() {
              return this.env;
            },

            buildUrl: function(path) {

              if (!this.options[ this.env ]) {
                this.env = 'production';
              }

              var url = this.options[this.env]['url'] + '/api/' + this.options[this.env]['version'] + path;

              console.log("API url: "+url);
              return url;
            },

            // login: function(user, onSuccess, onFailure) {
            //   $http.post(this.buildUrl("/auth/login"), user, {timeout: 5000})
            //        .success(onSuccess)
            //        .error(onFailure);
            // },

            wish: function(id, onSuccess, onFailure) {
              $http.get(this.buildUrl("/wish/"+id), {timeout: 5000})
                   .success(onSuccess)
                   .error(onFailure);
            },

            user: function(id, onSuccess, onFailure) {
              $http.get(this.buildUrl("/user/"+id), {timeout: 5000})
                   .success(onSuccess)
                   .error(onFailure);
            },

            createWish: function(data, onSuccess, onFailure) {
              console.log(data);
              $http.put(this.buildUrl("/product"), data, {timeout: 5000})
                   .success(onSuccess)
                   .error(onFailure);
            },

            updateWish: function(id, data, onSuccess, onFailure) {

              console.log(data);
              $http.put(this.buildUrl("/wish/"+id), data, {timeout: 5000})
                   .success(onSuccess)
                   .error(onFailure);
            }
          }
        }]);
