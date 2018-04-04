'use strict'
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){

	$scope.isShowPositionReport =true;
	$scope.isShowfavorite=true;

	$http.get('data/myFavorite.json').success(function(resp) {
	    $scope.list = resp;
	});
	

}])
