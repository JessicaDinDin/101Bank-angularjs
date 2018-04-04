'use strict'
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
	
	$http.get('/data/company.json').success(function(res){
		console.log("res",res)

		for(var i=0;i<res.length;i++){
			if(res[i].id == $state.params.id){
				$scope.company = res[i]
			}	
		}
		console.log("$scope.company",$scope.company)

	}).error(function(err){
		alert("出錯了!")
		def.reject(err);
	});
}])
