var detaliiController = angular.module("detaliiController", [
    "ui.router"
])

detaliiController.controller('detaliiController', ['$scope', '$http', '$state', "$stateParams", function($scope, $http, $state, $stateParams) {
    var constructor = function() {
        $http.get(SERVER + "/firme/" + $stateParams.id)
            .then(function(response) {
                $scope.firma = response.data;
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    
    $scope.template = "afisare";

    $scope.domenii = ["Administrativ/Logistica", "Agricultura", "Alimentatie/HoReCa", "Altele", "Arhitectura/Design Interior",
        "Asigurari", "Au pair/Babysitter/Curatienie", "Audit/Consultanta", "Auto/Echipamente", "Banci", "Cercetare-dezvoltare",
        "Chimie/Biochimie", "Confectii/Design vestimentar", "Constructii/Instalatii", "Controlul calitatii", "Crewing/Casino/Entertainment",
        "Educatie/Training/Arte", "Farmacie", "Financiar/Contabilitate", "Functii publice", "Imobiliare", "Import/Export", "Inginerie", "Internet/e-Comerce",
        "IT Hardware", "IT Software", "Juridic", "Jurnalism/Editorial", "Marketing", "Medicina alternativa", "Medicina umana", "Merchandising/Promoteri",
        "MLM/Vanzari directe", "Naval/Aeronautic", "Office/Back-office/Secretariat", "ONG/Voluntariat", "Paza si protectie/Militar", "Petrol/Gaze",
        "Prelucrarea lemnului/PVC", "Productie", "Proiectare civila/Industriala", "Protectia mediului", "Protectia muncii", "Publicitate",
        "Relatii clienti/Call center", "Relatii publice", "Resurse umane/Psihologie", "Saloane/Clinic frumusete", "Service/Reparatii", "Sport/Wellness",
        "Statistica/Matematica", "Telecomunicatii", "Tipografii/Edituri", "Traduceri", "Transport/Distributie", "Turism/Hotel staff"
    ];

    $scope.orase = ["Adjud", "Alba Iulia", "Alexandria", "Arad", "Bacau", "Baia Mare", "Barlad", "Bistrita", "Botosani", "Braila", "Brasov", "Bucuresti", "Buzau", "Calarasi",
        "Campulung Muscel", "Chisinau", "Cluj-Napoca", "Constanta", "Covasna", "Craiova", "Deva", "Drobeta-Turnu-Severin", "Fetesti", "Focsani", "Gaesti", "Galati", "Gheorgheni",
        "Giurgiu", "Hunedoara", "Husi", "Iasi", "Ilfov", "Marghita", "Miercurea-Ciuc", "Oradea", "Otopeni", "Petrosani", "Piatra Neamt", "Pitesti", "Ploiesti", "Ramnicu-Valcea", "Resita",
        "Rimnicu-sarat", "Roman", "Rovinari", "Satu-Mare", "Sfantu-Gheorghe", "Sibiu", "Slatina", "Slobozia", "STRAINATATE", "Suceava", "Targoviste", "Targu-Jiu", "Timisoara", "Tirgu-Mures",
        "Tulcea", "Turda", "Vaslui", "Zalau"
    ];

    $scope.tipuri_job = ["Full Time", "Part Time", "Practica", "Project Based", "Sezonier", "Temporar", "Voluntariat"];

    $scope.preiaTemplate = function() {
        return $scope.template;
    }

    $scope.salveazaDate = function(firma) {
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
            else {
                if (isNaN(firma.nr_telefon) || firma.nr_telefon.length != 10 || firma.nr_telefon.charAt(0) != "0") {
                    alert("Numarul de telefon nu este valid!");
                }
                else {
                    if (!firma.descriere) {
                        alert("Introduceti descrierea firmei!");
                    }
                    else {
                        $scope.template = "afisare";
                        $http.put(SERVER + "/firme/" + firma.id, firma)
                            .then(function(response) {
                                alert(response.data);
                                $state.go($state.current, {}, {
                                    reload: true
                                })
                            })
                            .catch(function(error) {
                                console.log(error);
                            })
                    }
                }
            }
        }
    }

    $scope.editeazaDate = function() {
        $scope.template = "editare";
    }

    $scope.anuleazaEditare = function() {
        $scope.template = "afisare";
    }

    $scope.adaugaAnunt = function(anunt, firma) {
        if (!anunt) {
            alert("Completati campurile!");
        }
        else {
            if (!anunt.nume) {
                alert("Introduceti titlul anuntului!");
            }
            else
            if (!anunt.domeniu) {
                alert("Alegeti domeniul anuntului!");
            }
            else
            if (!anunt.oras) {
                alert("Alegeti orasul in care este disponibil locul de munca!");
            }
            else
            if (!anunt.tip_oferta) {
                alert("Alegeti tipul ofertei de angajare!");

            }
            else {
                $http.post(SERVER + "/anunturi", {
                        anunt: anunt,
                        id_firma: firma.id
                    })
                    .then(function(response) {
                        $state.go($state.current, {}, {
                            reload: true
                        })
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        }
    }


    $scope.stergeAnunt = function(anunt) {
        $http.delete(SERVER + "/anunturi/" + anunt.id)
            .then(function(response) {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    $scope.mergiLaAnunt = function(anunt) {
        $state.go("detalii_anunt", {
            id: anunt.id
        });
    }

    constructor();
}])
