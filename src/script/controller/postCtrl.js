'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){
	
	$scope.isShowPositionReport =true;

	$scope.tabList=[
		{id:'all',name:'全部'},
		{id:'pass',name:'面試邀請'},
		{id:'fail',name:'不適合'},
	] 
	$http.get('data/myPost.json').success(function(res){
		console.log("res",res)
		$scope.list= res;
	})

	$scope.filterObj = {};
  	$scope.click = function(item) {
  		console.log(item)
  		console.log("item.id",item.id)
  		console.log("item.name",item.name)
  		$scope.selsectId = item.id

	    switch (item.id) {
	      case 'all':
	        delete $scope.filterObj.state;
	        break;
	      case 'pass':
	        $scope.filterObj.state = '1';
	        break;
	      case 'fail':
	        $scope.filterObj.state = '-1';         
	        break;
	      default:

    }
  }
}]);
