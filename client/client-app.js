var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller:'BooksController',
        templateUrl: './views/books.html'
    })
    .when('/books', {
        controller:'BooksController',
        templateUrl: './views/books.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});