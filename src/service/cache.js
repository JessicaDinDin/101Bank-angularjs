'use strict'
angular.module('app').service('cache',['$cookies',function($cookies){
	this.put=function(){
		$cookies.put(key,value);
	}
	this.get=function(){
		return $cookies.put(key);
	}
	this.remove = function(){
		$cookies.remove(key);
	}
}])