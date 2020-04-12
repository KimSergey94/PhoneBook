(function () {
    'use strict';

    angular.
        module('phoneBook', [
            'ngRoute'
        ]).
        config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider.
                when('/', {
                    controller: 'contactsCtrl',
                    templateURL: '/app/templates/contacts.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();