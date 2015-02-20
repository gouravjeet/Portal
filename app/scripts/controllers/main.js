'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('MainCtrl', function ($scope,$resource,$http,ngTableParams, $filter) {

    $scope.data=[];
    $scope.newdata={};
    // This function is fetching data from mongoDB database
    $scope.getData=function(){
    	$http.get('https://api.mongolab.com/api/1/databases/dara/collections/data?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL').
	    success(function(tagobj){
	    	$scope.data=tagobj;
	    	console.log($scope.data.length);

	    })
	    .error(function(){
	    	console.log('error');
	    });
    };
    $scope.getData();
    // This function is adding data into mongoDB database as a new dataset
    // whenever a user enters information in input box
    $scope.save=function(newUser){
      // Checking for Email Validation
      console.log($scope.data);
      var userValidity=true;
      var user=$scope.data;
      for(var i in user){
        console.log(user[i].email);
        if(user[i].email==newUser.email){
          userValidity=false;
          alert("Email Already Exists");
          newUser.email="";
          break;
        }
      }
      if(userValidity==true){
        var date = new Date();
        $scope.newdata.createDate=date;
        $scope.newdata.editDate=date;
        var newdata = JSON.stringify($scope.newdata);
        $http.post('https://api.mongolab.com/api/1/databases/dara/collections/data?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL',newdata)
          .success(function(tagobj){
            $scope.data=tagobj;
            console.log($scope.data);
            $scope.newdata={};
            $scope.getData();
          })
          .error(function(){
            console.log('error');
          });
      }

    };
    $scope.delete=function(row){
      $scope.id=row._id.$oid;
      $http.delete('https://api.mongolab.com/api/1/databases/dara/collections/data/' +
      $scope.id +'?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL')
        .success(function(){
          console.log('Row Deleted');
          $scope.getData();
        })
        .error(function(){
          console.log('error');
        });
    };
    $scope.edit=function(row){
      $scope.id=row._id.$oid;
      var date = new Date();
      console.log(row);
      $scope.newdata=row;
      $scope.newdata.editDate=date;
      console.log($scope.newdata);
      //var newdata = JSON.stringify($scope.newdata);
      $http.put('https://api.mongolab.com/api/1/databases/dara/collections/data/' +
          $scope.id +'?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL',{
        'lastName':$scope.newdata.lastName,
        'firstName':$scope.newdata.firstName,
        'age':$scope.newdata.age,
        'email':$scope.newdata.email,
        'createDate':$scope.newdata.createDate,
        'editDate':$scope.newdata.editDate,
        'active':$scope.newdata.active
      })
        .success(function(){

        })
        .error(function(){
          console.log('error');
        });

    };
     $scope.tableParams = new ngTableParams({
        page: 1,            // Show first page
        count: 10,        // Count per page
        sorting: {
         name: 'asc'     // initial sorting
        }
    }, {
        total: $scope.data.length, // length of data
        getData: function($defer, params) {

          var orderedData = params.sorting() ?
                              $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;
          $scope.data=orderedData;
          $defer.resolve($scope.data);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
  });
