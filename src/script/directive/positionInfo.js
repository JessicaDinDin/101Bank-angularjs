'use strict';
angular.module('app').directive('appPositionInfo', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html',
    scope:{
        isActive: '=',
        isLogin: '=',
        pos: '='
    },
    link:function($scope,element,attr){
        //$scope.imagePath = scope.isActive?'image/star-active.png':'image/star.png'
        //$scope.imagePath = 'image/star-active.png';
    }
  };
}]);
