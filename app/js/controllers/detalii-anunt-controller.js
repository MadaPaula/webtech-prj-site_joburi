var detaliiAnuntController = angular.module("detaliiAnuntController", [
    "ui.router"
])

detaliiAnuntController.controller('detaliiAnuntController', ['$scope', '$http', '$state', "$stateParams", function($scope, $http, $state, $stateParams) {
    var controller = function() {
        $http.get(SERVER + "/anunturi/" + $stateParams.id)
            .then(function(response) {
                $scope.anunt = response.data;

            })
            .catch(function(error) {
                console.log(error);
            })
    }

    controller();
}])
