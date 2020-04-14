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
            service.getNumbers = function (id) {
                var deferred = $q.defer();
                $http.post('PhoneBook/GetPhoneNumbers/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            service.getNotes = function (id) {
                var deferred = $q.defer();
                $http.post('PhoneBook/GetNotes/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            service.addNumberField = function () {
                var node = document.createElement("input");
                var numbersNum = document.getElementById('numbersNum');
                numbersNum.value = parseInt(numbersNum.value, 10)+1;
                node.className = "form-control numberEl";
                node.id = "numberEl" + numbersNum.value;
                document.getElementById('numberDiv').appendChild(node);
            };
            service.addNoteField = function () {
                var node = document.createElement("input");
                var notesNum = document.getElementById('notesNum');
                notesNum.value = parseInt(notesNum.value, 10) + 1;
                node.className = "form-control noteEl";
                node.id = "noteEl" + notesNum.value;
                document.getElementById('noteDiv').appendChild(node);
            };
            service.addNumber = function (contactId, number) {
                var deferred = $q.defer();
                $http.post('PhoneBook/AddNumber/', JSON.stringify({
                    contactId: contactId,
                    number: number
                })).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            service.addNote = function (contactId, noteText) {
                var deferred = $q.defer();
                $http.post('PhoneBook/AddNote/', JSON.stringify({
                    contactId: contactId,
                    noteText: noteText
                })).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addContact = function (contact) {
                var deferred = $q.defer();
                $http.post('PhoneBook/Create', contact).then(function (result) {
                    deferred.resolve(result.data);
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