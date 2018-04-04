'use strict'
angular.module('app').controller('searchCtrl', ['dict', '$state', '$http', '$scope', function(dict,$state, $http, $scope){
	console.log("dict",dict)
	//$scope.visible = false;
	// tab 清單
	$scope.tabList = [
		{id:'city',name:'城市'},
		{id:'salary',name:'薪水'},
		{id:'scale',name:'公司規模'},
	]

	// 搜尋
	$scope.name = '';
	$scope.search=function(){

		// 代表搜出全部
		if($scope.name==''){
			$http.get('/data/positionList.json').success(function(res){
				$scope.list = res
			}).error(function(err){
				alert("出錯了!")
			});
		}else{
			$scope.list='';

			$http.get('/data/positionList.json').success(function(res){
				console.log("res",res)
				console.log("有文字",$scope.name)
				var templist=[]
				for(var i=0;i<res.length;i++){
					for (var key in res[i]) { 
					    if(res[i][key].indexOf($scope.name)>-1){
					    	templist.push(res[i])
					    }
					}
				}

				$scope.list = templist;
				$scope.name=''
			}).error(function(err){
				alert("出錯了!")
			});
		}
	}

	$scope.search();
	$scope.sheet={};
	
	// 點擊tab
	var tabId = '';
	$scope.click=function(item){
		console.log("item",item)
		tabId =item.id;
		$scope.selsectId = item.id
		$scope.sheet.list = dict[item.id]
		$scope.sheet.visible = true
		console.log("$scope.sheet",$scope.sheet)
	}

	$scope.filterObj={};
	// 選擇彈出面板的選項
	$scope.sClick=function(id,name){
		console.log("id",id)
		console.log("name",name);

		if(id){
			angular.forEach($scope.tabList,function(item){
				if(item.id===tabId){
					item.name=name
				}
			})

			$scope.filterObj[tabId+'Id'] =id;

		}else{
			delete $scope.filterObj[tabId+'Id']
			angular.forEach($scope.tabList,function(item){
				if(item.id===tabId){
					switch(item.id){
						case 'city':
							item.name='城市'
							break;	
						case 'salary':
							item.name='薪水'
							break;	
						case 'scale':
							item.name='公司規模'
							break;
						default:	
					}
				}
			})
		}
	}

	

}])