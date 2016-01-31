var app = angular.module("myApp",['ngRoute','firebase']);


app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            controller: 'mainController',
            templateUrl: 'main.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller("mainController",function($scope,$firebaseArray){
    var ref_users = new Firebase('https://freelancer-test.firebaseio.com/users');

    $scope.users = $firebaseArray(ref_users);
    $scope.users.$loaded()
    .then(function(){
        console.log("Success!!");
    }).catch(function(err){
        console.log("Error!"+err);
    });

    $scope.submit = function(){
        $scope.users.$add({
            name: $scope.input.name,
            imageUrl: $scope.input.imageUrl,
            phone: $scope.input.phone,
            description: $scope.input.description,
            email: $scope.input.email
        });
        $scope.input = null;
    };

});