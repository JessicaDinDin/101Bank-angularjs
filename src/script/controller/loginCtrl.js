
'use strict'
angular.module('app').controller('loginCtrl',['$state','$cookies','$http','$scope',function($state,$cookies,$http,$scope){
	console.log("AA")
	$scope.submit= function() {
		console.log("login");
	    $http.post('data/login.json', $scope.user).success(function(resp){
	    	
	      $cookies.put('id',resp.id);
	      $cookies.put('name',resp.name);
	      $cookies.put('image',resp.image);
	      $state.go('main');
	    });
	}


}])

