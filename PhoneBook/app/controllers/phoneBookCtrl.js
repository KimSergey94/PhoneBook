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

                dataService.getContactById($routeParams.id).then(function (result) {
                    $scope.contact = result;
                }, function () {
                    toastr.error('Error in fetching the contact with Id = ' + $routeParams.id);
                    });

                $scope.updateContact = function (contact) {
                    dataService.editContact(contact).then(function () {
                        toastr.success('Contact updating is completed successfully.');
                        $location.path('/');
                    }, function () {
                        toastr.error('Error in updating the contact.');
                    });
                };

            }]);
})();