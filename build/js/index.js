'use strict'
angular.module('app',['ui.router','ngCookies','validation'])
'use strict'

// 定義全局變數，ㄧ開始和刷新後會出現

angular.module('app').value('dict', {}).run(['dict', '$http', function(dict, $http){
  $http.get('data/city.json').success(function(resp){
    dict.city = resp;
  });
  $http.get('data/salary.json').success(function(resp){
    dict.salary = resp;
  });
  
  $http.get('data/scale.json').success(function(resp){
    dict.scale = resp;
  });
}]);

'use strict';
angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
    $delegate.post = function(url, data, config) {
      var def = $q.defer();
      $delegate.get(url).success(function(resp) {
        def.resolve(resp);
      }).error(function(err) {
        def.reject(err);
      });
      return {
        success: function(cb){
          def.promise.then(cb);
        },
        error: function(cb) {
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}]);

'use strict'

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	}).state('position',{
		url:'/position/:id',
		templateUrl:'view/position.html',
		controller:'positionCtrl'
	}).state('company',{
		url:'/company/:id',
		templateUrl:'view/company.html',
		controller:'companyCtrl'
	}).state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	}).state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	}).state('register',{
		url:'/register',
		templateUrl:'view/register.html',
		controller:'registerCtrl'
	}).state('me',{
		url:'/me',
		templateUrl:'view/me.html',
		controller:'meCtrl'
	}).state('post',{
		url:'/post',
		templateUrl:'view/post.html',
		controller:'postCtrl'
	}).state('favorite',{
		url:'/favorite',
		templateUrl:'view/favorite.html',
		controller:'favoriteCtrl'
	})

	$urlRouterProvider.otherwise('main');


}]);
'use strict';
angular.module('app').config(['$validationProvider', function($validationProvider) {
  var expression = {
    phone: /^0[\d]{9}$/,
    password: function(value) {
      var str = value + ''
      return str.length > 5;
    },
    required: function(value) {
      return !!value;
    }
  };
  var defaultMsg = {
    phone: {
      success: '',
      error: '需10位數字'
    },
    password: {
      success: '',
      error: '長度6位'
    },
    required: {
      success: '',
      error: '不能空'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);

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

'use strict'
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){

	$scope.isShowPositionReport =true;
	$scope.isShowfavorite=true;

	$http.get('data/myFavorite.json').success(function(resp) {
	    $scope.list = resp;
	});
	

}])


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
'use strict'
angular.module('app').controller('meCtrl',['$state','$cookies','$http','$scope',function($state,$cookies,$http,$scope){

    if($cookies.get('name')) {
      $scope.name = $cookies.get('name');
      $scope.image = $cookies.get('image');
    }
    $scope.logout = function() {
      $cookies.remove('id');
      $cookies.remove('name');
      $cookies.remove('image');
      $state.go('main');
    };

}])


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
'use strict';
angular.module('app').directive('appAd', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/ad.html'
  };
}]);

'use strict';
angular.module('app').directive('appCompany', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/company.html',
    scope:{
    	com:'='
    }
  };
}]);
'use strict';
angular.module('app').directive('appFooter', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  };
}]);


'use strict';
angular.module('app').directive('appHead', ['$cookies',function($cookies){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html',
    scope:{
    	name:'='
    },
    link:function(scope){
        scope.isShowLoginBtn=true;

        if($cookies.get('name')){
            scope.isShowLoginBtn=false;
        }

    	scope.username=$cookies.get('name');
    }
  };
}]);


'use strict';
angular.module('app').directive('appHeadBar', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/headBar.html',
    scope:{
    	text:'@'
    },
    link:function(scope,element,attr){
    	//綁定 directive 中的函數
    	scope.back=function(){
    		window.history.back();
    	}
    }
  };
}]);

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
'use strict';
angular.module('app').directive('appPositionInfo', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html',
    scope:{
        isActive: '=',
        isLogin: '=',
        pos: '='
    },
    link:function($scope,element,attr){
        //$scope.imagePath = scope.isActive?'image/star-active.png':'image/star.png'
        //$scope.imagePath = 'image/star-active.png';
    }
  };
}]);

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

'use strict';
angular.module('app').directive('appSheet', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/sheet.html',
    scope:{
    	list:'=',
    	visible:'=',
    	select:'&'
    },
  };
}]);
'use strict';
angular.module('app').directive('appTab', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      tabClick: '&'
    },
    templateUrl: 'view/template/tab.html',
    link: function($scope) {
      $scope.click = function(tab) {
        $scope.selectId = tab.id;
        $scope.tabClick(tab);
      };
    }
  };
}]);

'use strict';
angular.module('app').filter('filterByObj', [function(){
  return function(list, obj) {
    console.log("---list---",list)
    console.log("--obj--",obj)
    var result = [];
    angular.forEach(list, function(item){
      var isEqual = true;
      for(var e in obj){
        if(item[e]!==obj[e]) {
          isEqual = false;
        }
      }
      if(isEqual) {
        result.push(item);
      }
    });
    return result;
  };
}]);
