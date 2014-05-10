'use strict';

angular.module('myApp.directives', [])
.directive('disabler', function($compile) {
  return {
    link: function(scope, elm, attrs) {
      var btnContents = $compile(elm.contents())(scope);
      scope.$watch(attrs.ngModel, function(value) {
        if (value) {
          elm.html(scope.$eval(attrs.disabler));
          elm.attr('disabled',true);
        } else {
          elm.html('').append(btnContents);
          elm.attr('disabled',false);
        }
      });
    }
  }
});