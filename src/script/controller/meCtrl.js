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

