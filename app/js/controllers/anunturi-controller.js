var anunturiController = angular.module("anunturiController", [
    "ui.router"
])

anunturiController.controller('anunturiController', ['$scope', '$http', '$state', "$stateParams", function($scope, $http, $state, $stateParams) {
    var constructor = function() {
        $http.get(SERVER + "/anunturi")
            .then(function(response) {
                $scope.anunturi = response.data;
                console.log($scope.anunturi);
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    $scope.mergiLaAnunt = function(anunt){
        $state.go("detalii_anunt",{id:anunt.id});
    }
    constructor();
}])
