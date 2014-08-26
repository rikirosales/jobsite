movieStubApp.factory('movieStubFactory', function ($resource) {
    return $resource('/api/bears');
});


/*movieStubApp.factory('movieStubBookingsFactory', function ($resource) {
    return $resource('/bookings');
});*/