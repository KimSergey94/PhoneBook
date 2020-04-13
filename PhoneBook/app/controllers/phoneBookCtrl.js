(function () {
    'use strict';

    angular
        .module('phonebook')
        .controller('contactsCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.contacts = [];

            getData();

            function getData() {
                dataService.getContacts().then(function (result) {
                    $scope.contacts = result;
                    for (var i = 0; i < $scope.contacts.length; i++)
                    {
                        $scope.contacts[i].Number = $scope.contacts[i].Number.replace(/;;;/g, "\n");
                        $scope.contacts[i].Note = $scope.contacts[i].Note.replace(/;;;/g, "\n");
                    }
                });
            }

            $scope.deleteContact = function (id) {
                dataService.deleteContact(id).then(function () {
                    toastr.success('Contact is deleted successfully.');
                    getData();
                }, function () {
                    toastr.error('Error in deleting the contact with the Id = ' + id);
                });
            };
        }])
        .controller('addContactCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createContact = function (contact) {
                dataService.addContact(contact).then(function () {
                    toastr.success('Contact is created successfully.');
                    $location.path('/');
                }, function () {
                    toastr.error('Error during the contact creation.');
                });
            };
        }])
        .controller('editContactCtrl', ['$scope', '$routeParams', '$location', 'dataService',
            function ($scope, $routeParams, $location, dataService) {
                $scope.contact = {};
                $scope.numbers = [];
                $scope.notes = [];

                dataService.getContactById($routeParams.id).then(function (result) {
                    $scope.contact = result;
                }, function () {
                    toastr.error('Error in fetching the contact with Id = ' + $routeParams.id);
                    });

                dataService.getNotes($routeParams.id).then(function (result) {
                    $scope.notes = result;
                    var notesNum = document.getElementById('notesNum');
                    notesNum.value = $scope.notes.length;
                    for (var i = 0; i < $scope.notes.length; i++) {
                        var node = document.createElement("input");
                        node.className = "form-control noteEl";
                        node.id = "noteEl" + i;
                        document.getElementById('noteDiv').appendChild(node);
                        node.value = $scope.notes[i];
                    }
                });
                dataService.getNumbers($routeParams.id).then(function (result) {
                    $scope.numbers = result;
                    var numbersNum = document.getElementById('numbersNum');
                    numbersNum .value = $scope.notes.length;
                    for (var i = 0; i < $scope.numbers.length; i++) {
                        var node = document.createElement("input");
                        node.className = "form-control numberEl";
                        node.id = "numberEl" + i;
                        document.getElementById('numberDiv').appendChild(node);
                        node.value = $scope.numbers[i];
                    }
                });

                $scope.updateContact = function (contact) {
                    dataService.editContact(contact).then(function () {
                        toastr.success('Contact updating is completed successfully.');
                        $location.path('/');
                    }, function () {
                        toastr.error('Error in updating the contact.');
                    });
                };

                $scope.deleteContact = function (id) {
                    dataService.deleteContact(id).then(function () {
                        toastr.success('Contact is deleted successfully.');
                        getData();
                    }, function () {
                        toastr.error('Error in deleting the contact with the Id = ' + id);
                    });
                };
            }]);
})();