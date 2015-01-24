'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('MainCtrl', function ($scope,$resource,$http) {
    
    $scope.data=[];
    $scope.newdata={};
    $scope.getData=function(){
    	$http.get('https://api.mongolab.com/api/1/databases/dara/collections/data?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL').
	    success(function(tagobj){
	    	$scope.data=tagobj;
	    	console.log($scope.data);
	         
	    })
	    .error(function(){
	    	console.log('error');
	    });
    };
    $scope.getData();
    $scope.save=function(){
    	console.log($scope.newdata);
    	var newdata = JSON.stringify($scope.newdata);
    	$http.post('https://api.mongolab.com/api/1/databases/dara/collections/data?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL',newdata)
    	.success(function(tagobj){
    	$scope.data=tagobj;
    	console.log($scope.data);
    	$scope.newdata={};
    	})
	    .error(function(){
	    	console.log('error');
	    });
	    $scope.getData();
    };
    

  });
