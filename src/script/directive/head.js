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

