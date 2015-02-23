'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('fetch data from Mongo DB Database', function(){
          var serviceApi=$scope.getData();

  });
  it('add new row by clicking on add User Button', function(){

  });
  it('Should start Inline Editing of the Selected Row', function(){

  });

  it('Remove Row by Clicking the Delete Button', function(){

  });
  it('Clicking on the Revert Button will revert the changes', function(){

  });
  it('Checking for Validity of Email, LastName, and FirstName', function(){

  });
  it('Typing the Value in Input Box will filter the Rows', function(){

  });
  it('Checking Email for Duplicate Emails', function(){

  });
  it('It should Sort Column', function(){

  });








});
