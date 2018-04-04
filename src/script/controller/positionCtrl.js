'use strict'

angular.module('app').controller('positionCtrl',['$cookies','$q','$http','$state','$scope',function($cookies,$q,$http, $state, $scope){
	
	//$cookies.remove('day','to')
	

	// 獲取路由ID值
	console.log("$state.params",$state.params)
	// $http.get('/data/position.json?id='+$state.params.id).success(function(res){
	// 	console.log("res", res)
	// 	//$scope.position = res
	// }).error(function(err){
	// 	alert("出錯了!")
	// });

	$scope.isLogin=false;

	// 獲取該職位訊息
	function getPosition(){

		var def = $q.defer();

		$http.get('/data/position.json').success(function(res){
			console.log("res", res)
			for(var i=0;i<res.length;i++){
				if(res[i].id == $state.params.id){
					$scope.position = res[i]
				}
			}
			// 執行成功
			def.resolve(res);
		}).error(function(err){
			alert("出錯了!")
			def.reject(err);
		});

		return def.promise;
	}

	// 獲取該公司訊息(用 companyId去找)
	function getCompany(companyId){
		console.log("companyId",companyId)
		$http.get('/data/company.json').success(function(res){
			console.log("---res---", res)
			for(var i=0;i<res.length;i++){
				if(res[i].id == companyId){
					$scope.company = res[i]
				}
			}

			console.log("$scope.company",$scope.company)
			
		}).error(function(err){
			alert("出錯了!")	
		});
	}

	getPosition().then(function(obj){
		getCompany($scope.position.companyId)
	},function(err){

	})

	
	
	




}])
