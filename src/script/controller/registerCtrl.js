'use strict';

angular.module('app').controller('registerCtrl', ['$interval', '$http', '$scope', '$state', function($interval, $http, $scope, $state){
	
	$scope.submit = function() {
	
	    $http.post('data/regist.json',$scope.user).success(function(resp){
	    	console.log("resp",resp);
	    	alert("注冊成功");
	     	$state.go('login');
	    });
  	};
}]);
