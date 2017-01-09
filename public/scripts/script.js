var myApp = angular.module('myApp', []);
myApp.controller('whereMyPeeps', ['$scope', '$http', function($scope, $http) {
    $scope.addRecord = function() {
        event.preventDefault();
        var objectToSend = {
            name: $scope.nameIn,
            location: $scope.locationIn
        }; //end objectToSend
        $http({
            method: 'POST',
            url: '/testPost',
            data: objectToSend
        });
        $scope.nameIn = '';
        $scope.locationIn = '';
    };
    $scope.getRecords = function() {
        $http({
            method: 'GET',
            url: '/getRecords',
        }).then(function(response) {
            $scope.allTheRecords = response.data;
            console.log($scope.allTheRecords);
        });
    };
}]);
