window.movieStubApp = angular.module('movieStubApp', ['ngRoute','ngResource']);
 
movieStubApp.controller("movieStubController", function ($scope,movieStubFactory) {

    $scope.headerSrc = "tmpl/header.html"
    $scope.movies = movieStubFactory.query();


     $scope.formData = {};
     $scope.favMovie={};
     $scope.processedForm = function(){
        $scope.errorName = "Error on the name";
        //$scope.mesasge = "Success!";
     }

     $scope.getMovieById=function(id){
        var movies = $scope.movies;
        for(i in movies){
            if(movies[i]._id == id){
                 $scope.favMovie = movies[i];
                
            }
        }
     }
     $scope.back = function () {
        window.history.back();
     };
   /* $scope.isActive = function (route) {
        return route === $location.path();
    }
 
    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    }*/
});

movieStubApp.controller("jobDetailsController", function ($scope, $routeParams) {
    $scope.getMovieById($routeParams.id);
    
     $scope.getCount = function (n) {
        return new Array(n);
     };
});

movieStubApp.controller("bookTicketsController", function ($scope, $http, $location, $routeParams) {
    console.log("1")
    $scope.getMovieById($routeParams.id);
    $scope.onlyNumbers = /^\d+$/;
    $scope.formData = {};
    $scope.formData.movie_id = $scope.favMovie.id;
    $scope.formData.movie_name = $scope.favMovie.name;
    $scope.formData.date = "Today"
 
    $scope.processForm = function () {
        $http({
            method: 'POST',
            url: '/book',
            data: $.param($scope.formData), // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
            .success(function (data) {
                console.log(data);
            });
    };
});



movieStubApp.controller("addContentController", function ($scope, $http, $location, $routeParams) {

    $scope.addData={};
    $scope.addData.name="Riki"
    $scope.addContent = function(){
        console.log($scope.addData.name + " movie_names");
        $http({
            method:"POST",
            url:"#/addBearContent",
            data:$.param($scope.addData),
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }

        })
        .success(function(data){
            $scope.message =data;
            console.log(data)
        })
    }
})



movieStubApp.controller("bookingDetailsController", function ($scope, movieStubBookingsFactory) {
    $scope.bookings = movieStubBookingsFactory.query();
});