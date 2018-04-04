'use strict';
angular.module('app').directive('appAd', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/ad.html'
  };
}]);
