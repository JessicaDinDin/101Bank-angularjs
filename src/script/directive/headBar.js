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
