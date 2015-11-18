// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    Parse.initialize("CC2pOFe2VHe4JIbjmGMtBLPVhKBys8e4EBKkdfan", "moIheRAigAHZ7msFTRPsvbTYDILRHfoRW3H7XJFE"); // App Key, Javascript Key
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  })
  .state('inputData', {
    url: '/inputData',
    templateUrl: 'templates/inputData.html',
    controller: 'DataCtrl'
  })
  .state('getData', {
    url: '/getData',
    templateUrl: 'templates/getData.html',
    controller: 'DataCtrl'
  })
  .state('addBook', {
    url: '/addBook',
    templateUrl: 'templates/addBook.html',
    controller: 'BookCtrl'
  })
  .state('getBook', {
    url: '/getBook',
    templateUrl: 'templates/getBook.html',
    controller: 'BookCtrl'
  });

  $urlRouterProvider.otherwise("/");

});

app.controller('LoginCtrl', function($scope, $state) {

  $scope.data = {};

  $scope.signupEmail = function(){
    //Create a new user on Parse
    var user = new Parse.User();
    user.set("username", $scope.data.username);
    user.set("password", $scope.data.password);
    user.set("email", $scope.data.email);

    // other fields can be set just like with Parse.Object
    user.set("somethingelse", "like this!");

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert("success!");
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  $scope.loginEmail = function(){
    Parse.User.logIn($scope.data.username, $scope.data.password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log(user);
        alert("success!");
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert("error!");
      }
    });
  };
});

app.controller('DataCtrl', function($scope, $state){
  $scope.data = {};

  $scope.saveData = function(){
    console.log($scope.data);
    // var UserDataObject = Parse.Object.extend("UserDataObject");
    // var userData = new UserDataObject();
    var userData = new Parse.Object("UserDataObject");
    userData.set("createdBy", Parse.User.current());
    userData.set("averageShots", $scope.data.shots);
    userData.set("averageTime", $scope.data.time);
    userData.set("forehandShots", $scope.data.forehand);
    userData.set("backhandShots", $scope.data.backhand);
    userData.save(null, {});
    console.log(userData);
  }

  $scope.getData = function(){
    var query = new Parse.Query("UserDataObject");
    query.equalTo("createdBy", Parse.User.current());

    query.find({
      success: function(results) {
        alert("Successfully returned " + results.length + " people!");
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + " - " + object.get("createdBy") + " - " + object.get("averageShots") + " " + object.get("averageTime") + " " + object.get("forehandShots") + " " + object.get("backhandShots"));
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
});

app.controller('BookCtrl', function($scope, $state){
  $scope.data = {};
  $scope.saveBook = function(){
    console.log($scope.data);
    var bookData = new Parse.Object("BookDataObject");

    bookData.relation("authors", function(relation) {
      relation.add($scope.data.authorOne);
      relation.add($scope.data.authorTwo);
    });

    bookData.save().then(
      function(bookData) {
        // the object was saved.
        console.log("Save book successfully");
        console.log(bookData);
      },
      function(error) {
        // saving the object failed.
        console.log("Error: " + error.code + " " + error.message);
    });

  };

  $scope.getBook = function(){
    // var searchName = $scope.data.authorName;
    //
    // var bookData = new Parse.Object("BookDataObject");
    // var relation = bookData.relation("authors");
    //
    // var query = relation.query();
    // console.log(query);
    // query.find({
    //   success: function(results) {
    //     alert("Successfully returned " + results.length + " people!");
    //     for (var i = 0; i < results.length; i++) {
    //       var object = results[i];
    //       console.log(object.id + " - " + object.get("authorOne") + " - " + object.get("authorTwo"));
    //     }
    //   },
    //   error: function(error) {
    //     alert("Error: " + error.code + " " + error.message);
    //   }
    // });
    var BookData = Parse.Object.extend("BookDataObject");
    var query = new Parse.Query(BookData);

    query.get("E7aXHh2klo", {
      success: function(results) {
        alert("Successfully returned " + results.length + " people!");
        console.log(results);
        // for (var i = 0; i < results.length; i++) {
        //   var object = results[i];
        //   console.log(object);
        //   // console.log(object.id + " - " + object.get("authorOne") + " - " + object.get("authorTwo"));
        // }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  };
});
