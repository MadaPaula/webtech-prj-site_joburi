var app = angular.module("jobApp", [
    "ui.router",
    "ngMessages",
    "firmeController",
    "detaliiController",
    "anunturiController",
    "detaliiAnuntController"
])

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("home");

    $stateProvider
        .state("home", {
            url: "/home",
            template: "<h2> Bun venit la catalogul de joburi!</h2>"
        })
        .state("firme", {
            url: "/firme",
            templateUrl: "views/firme.html",
            controller: "firmeController"
        })
        .state("detalii_firma",{
            url:"/firme/:id",
            templateUrl:"views/detalii_firma.html",
            controller:"detaliiController"
        })
        .state("anunturi",{
            url:"/anunturi",
            templateUrl:"views/anunturi.html",
            controller: "anunturiController"
        })
        .state("detalii_anunt",{
            url:"/anunturi/:id",
            templateUrl:"views/detalii_anunt.html",
            controller:"detaliiAnuntController"
        })
}])
