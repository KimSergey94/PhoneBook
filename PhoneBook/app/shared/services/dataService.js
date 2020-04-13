(function () {
    'use strict';

    angular
        .module('phonebook')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getContacts = function () {
                var deferred = $q.defer();
                $http.get('/PhoneBook/Index').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                    });
                return deferred.promise;
            };

            service.getContactById = function (id) {
                var deferred = $q.defer();
                $http.get('/PhoneBook/Details/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addContact = function (contact) {
                var deferred = $q.defer();
                $http.post('PhoneBook/Create', contact).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editContact = function (contact) {
                var deferred = $q.defer();
                $http.post('PhoneBook/Edit', contact).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteContact = function (id) {
                var deferred = $q.defer();
                $http.post('PhoneBook/Delete/' + id, { id: id }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();