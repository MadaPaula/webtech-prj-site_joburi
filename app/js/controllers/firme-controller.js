var firmeController = angular.module("firmeController", [
    "ui.router"
])
var SERVER = "https://webtech-prj-site-joburi-mmadalina.c9users.io";

firmeController
    .controller('firmeController', ['$scope', '$http', '$state', function($scope, $http, $state) {

        var constructor = function() {
            $http.get(SERVER + "/firme")
                .then(function(response) {
                    $scope.firme = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        $scope.mergiLaDetalii = function(firma) {
            $state.go("detalii_firma", {
                id: firma.id
            })
        }

        $scope.adaugaFirma = function(firma) {
            if (!firma) {
                alert("Completati campurile!");
            }
            else {
                if (!firma.denumire) {
                    alert("Introduceti denumirea firmei!");
                }
                else
                if (!firma.adresa) {
                    alert("Introduceti adresa firmei!");
                }
                else
                if (!firma.nr_telefon) {
                    alert("Introduceti numarul de telefon al firmei!");
                }

                else
                if (!firma.descriere) {
                    alert("Introduceti descrierea firmei!");

                }

                else {
                    $http.post(SERVER + "/firme", firma)
                        .then(function(response) {
                            $state.go($state.current, {}, {
                                reload: true
                            })
                            alert(response.data);
                        })
                        .catch(function(error) {
                            console.log(error);
                            alert(error.data);
                        })
                }
            }
        }

        $scope.stergeFirma = function(firma) {
            $http.delete(SERVER + "/firme/" + firma.id)
                .then(function(response) {
                    $state.go($state.current, {}, {
                        reload: true
                    })
                    alert(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                    alert.error.data;
                })
        }

        constructor();
    }])
    .directive("verificareTelefon", function() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.telefon = function(modelValue, viewValue) {
                    if (isNaN(modelValue) || modelValue.length != 10 || modelValue.charAt(0) != "0") {
                        return false;
                    }
                    else
                        return true;
                }
            }
        }
    })
