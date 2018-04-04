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
