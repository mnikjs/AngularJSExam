'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('UserListCtrl', [
  	"Data", "$scope", "$state",
  	function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //페이지가 로딩되었을때 호출
    $scope.$on('$viewContentLoaded', function(){
    	$scope.requestUserList();
    });

    $scope.userList = [];
    $scope.requestUserList = function(){
    	var dataPromise = Data.getData('http://10.0.2.2:52273/user');
    	dataPromise.then(function(results){
    		$scope.userList = results.data;
    	}, function(reason){}, function(update){});
    }

    $scope.deleteUserInfo = function(id){
    	var dataPromise = Data.deleteData('http://10.0.2.2:52273/user/'+id, '');
    	dataPromise.then(function(results){

    	}, function(reason){}, function(update){});
    }

    $scope.modifyUserInfo = function(id,name,age){
    	var dataPromise = Data.modifyData('http://10.0.2.2:52273/user/'+id, '&name='+name+'&age='+age);
    	dataPromise.then(function(results){
    		$scope.requestUserList();
    	}, function(reason){}, function(update){});
    }

    $scope.userInfo = {};
    $scope.getUserInfo = function(id){
    	//console.log("id="+id);
    	var dataPromise = Data.getData('http://10.0.2.2:52273/user/'+id);
    	dataPromise.then(function(results){
    		//console.log(results);
    		$scope.userInfo = results.data;
    	}, function(r){}, function(u){});
    }
  }]);
