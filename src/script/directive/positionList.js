'use strict';
angular.module('app').directive('appPositionList', ['$cookies',function($cookies){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionList.html',
        scope:{
        	data:'=',
        	filterObj:'=',
            showbtn:'=',
            report:'='
        },
        controller:function($scope){
            $scope.name=$cookies.get('name') || '';
            $scope.select=function(item,$index){
                $scope.data.splice($index, 1);
            }
        }
    };
}]);
