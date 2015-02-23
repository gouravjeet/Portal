'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('MainCtrl', function ($scope, $resource, $http, ngTableParams, $filter) {

    $scope.data = [];
    $scope.newdata = {};
    $scope.newdata = {};
    $scope.userValidity = true;
    $scope.blankObj = {
      lastName: '',
      firstName: '',
      age: '',
      email: ''
    };
    $scope.errorMessage = '';


    // This function is fetching data from mongoDB database
    $scope.getData = function () {
      $http.get('https://api.mongolab.com/api/1/databases/dara/collections/data?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL').
        success(function (tagobj) {
          $scope.data = tagobj;
          console.log($scope.data.length);
          //$scope.tableParams.total($scope.data.length);
        })
        .error(function () {
          console.log('error');
        });
    };
    $scope.getData();

    // This function is adding data into mongoDB database as a new dataset
    // whenever a user enters information in input box
    $scope.addNewUser = function (newUser) {
      // Checking for Validity of Email
      if (!newUser) {
        $scope.userValidity = false;
        $scope.errorMessage = 'Please Enter Valid User';
      }
      if ($scope.userValidity && !newUser.hasOwnProperty('lastName')) {
        $scope.errorMessage = 'Lastname is necessary';
        $scope.userValidity = false;
      }
      if ($scope.userValidity && !newUser.hasOwnProperty('firstName')) {
        $scope.errorMessage = 'Firstname is necessary';
        $scope.userValidity = false;
      }
      if ($scope.userValidity && !newUser.hasOwnProperty('email')) {
        $scope.errorMessage = 'Email is necessary';
        $scope.userValidity = false;
      }
      console.log('YYY');
      if ($scope.userValidity && !newUser.hasOwnProperty('active')) {
        newUser.active = false;
      }
      console.log('YYY');
      var user = $scope.data;
      if ($scope.userValidity == true) {
        $scope.errorMessage = "";
        for (var i in user) {
          console.log(user[i].email);
          if (user[i].email == newUser.email) {
            $scope.userValidity = false;
            $scope.errorMessage = 'Email Already Exists';
            newUser.email = "";
            break;
          }
        }
        var date = new Date();
        $scope.newdata.createDate = date;
        $scope.newdata.editDate = date;
        var newdata = JSON.stringify($scope.newdata);

        $http.post('https://api.mongolab.com/api/1/databases/dara/collections/data?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL', newdata)
          .success(function (tagobj) {
            $scope.data = tagobj;
            $scope.newdata = {};
            $scope.getData();
            console.log('New user Created');
          })
          .error(function () {
            console.log('error');
          });
      }
      $scope.newdata = $scope.blankObj;
      console.log($scope.newdata);
    };
    $scope.delete = function (row) {
      $scope.id = row._id.$oid;
      $http.delete('https://api.mongolab.com/api/1/databases/dara/collections/data/' +
      $scope.id + '?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL')
        .success(function () {
          console.log('Row Deleted');
          $scope.getData();
        })
        .error(function () {
          console.log('error');
        });
    };
    $scope.revertChanges = function () {

    };
    $scope.editUser = function (user) {
      $scope.editdata = user;
    };
    $scope.saveUser = function (row) {
      $scope.id = row._id.$oid;
      var date = new Date();
      console.log(row);
      $scope.editdata = row;
      $scope.editdata.editDate = date;
      console.log($scope.editdata);
      //var newdata = JSON.stringify($scope.newdata);
      $http.put('https://api.mongolab.com/api/1/databases/dara/collections/data/' +
      $scope.id + '?apiKey=hQd3U3G0xCnfVikoy53-g6nG8J7smyhL', {
        'lastName': $scope.editdata.lastName,
        'firstName': $scope.editdata.firstName,
        'age': $scope.editdata.age,
        'email': $scope.editdata.email,
        'createDate': $scope.editdata.createDate,
        'editDate': $scope.editdata.editDate,
        'active': $scope.editdata.active
      })
        .success(function () {
        })
        .error(function () {
          console.log('error');
        });
      $scope.editdata = $scope.blankObj;
    };
    var count = 1;
    $scope.tableParams = new ngTableParams({
      page: 1,            // Show first page
      count: 10,        // Count per page
      sorting: {
        name: 'asc'     // initial sorting
      }
    }, {
      total: $scope.data, // length of data
      getData: function ($defer, params) {
        var orderedData = params.sorting() ?
          $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;
        console.log(orderedData);
        console.log($scope.data.length);
        $scope.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        params.total(orderedData.length);
        // $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        //$defer.resolve($scope.data);
        //$scope.data=orderedData;
        //$defer.resolve($scope.data);
        //$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

      }
    });
    $scope.nextPage = function () {
      if (count < (($scope.data.length / 10))) {
        count++;
        $scope.tableParams.page($scope.tableParams.page() + 1);
      }
      console.log($scope.tableParams.page());
    };
    $scope.previousPage = function (hi) {
      console.log(hi);
      if (count > 1) {
        count--;
        $scope.tableParams.page($scope.tableParams.page() - 1);
      }
    };
  });
