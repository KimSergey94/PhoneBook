(function () {
    'use strict';

    angular.
        module('phonebook', [
            'ngRoute'
        ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', {
                    controller: 'contactsCtrl',
                    templateUrl: '/app/templates/contacts.html'
                })
                .when('/addcontact', {
                    controller: 'addContactCtrl',
                    templateUrl: '/app/templates/addContact.html'
                })
                .when('/editcontact/:id', {
                    controller: 'editContactCtrl',
                    templateUrl: '/app/templates/editContact.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();