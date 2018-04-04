'use strict';
angular.module('app').directive('appPositionClass', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionClass.html',
    scope:{
        com:'=',
    },
    link: function($scope) {
      $scope.showPositionList = function(idx) {
        console.log("idx",idx)
        $scope.positionList = $scope.com.positionClass[idx].positionList;
        $scope.isActive = idx;
      }
      $scope.$watch('com', function(newVal){
        console.log("newVal",newVal)
        if(newVal) {
            $scope.showPositionList(0);
        }
      });
    }
    
  };
}]);