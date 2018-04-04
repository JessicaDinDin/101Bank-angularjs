'use strict'
angular.module('app').controller('mainCtrl',['$state','$cookies','$http','$scope',function($state,$cookies,$http,$scope){


	// 是否顯示職缺報報欄位
	$scope.isShowReport=true;

	
	$http.get('/data/positionList.json').success(function(res){
		$scope.list = res
	}).error(function(err){
		alert("出錯了!")
	});

}])