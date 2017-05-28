var myApp = angular.module('myApp');

myApp.controller('BooksController',['$scope','$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('Books Controller Loaded...');
    $scope.getBooks=function(){
    }
}]);