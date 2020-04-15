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
            service.addNoteField = function () {
                var node = document.createElement("input");
                var notesNum = document.getElementById('notesNum');
                var br = document.createElement("br");
                var noteDiv = document.getElementById('noteDiv');
                var a = document.createElement("a");
                var link = document.createTextNode("delete");
                notesNum.value = parseInt(notesNum.value, 10) + 1;
                node.className = "form-control noteEl Add";
                node.style = "display:inline-block";
                node.id = "noteEl" + notesNum.value;
                noteDiv.appendChild(node);

            };

            service.addNumberField = function () {
                var node = document.createElement("input");
                var numbersNum = document.getElementById('numbersNum');
                var br = document.createElement("br");
                var numberDiv = document.getElementById('numberDiv');
                var a = document.createElement("a");
                var link = document.createTextNode("delete");
                numbersNum.value = parseInt(numbersNum.value, 10) + 1;
                node.className = "form-control numberEl Add";
                node.style = "display:inline-block";
                node.id = "numberEl" + numbersNum.value;
                numberDiv.appendChild(node);
                a.appendChild(link);
                a.id = "delete" + numbersNum.value;
                a.href = "";
                if (document.getElementById('contactId') && document.getElementById('contactId').value) {
                    a.setAttribute("ng-click", "deleteNumber(" + document.getElementById('contactId').value + " ," + numbersNum.value + ")");
                } else {
                    a.setAttribute("ng-click", "deleteNumber(" + numbersNum.value + ")");
                }
                numberDiv.appendChild(a);
                numberDiv.appendChild(br);

                angular.element(document).injector().invoke(function ($compile) {
                    var scope = angular.element(a).scope();
                    $compile(a)(scope);
                });
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
            service.editNumber = function (contactId, number, numberElId) {
                var deferred = $q.defer();
                $http.post('PhoneBook/EditNumber', JSON.stringify({
                    contactId: contactId,
                    number: number,
                    numberElId: numberElId
                })).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            service.editNote = function (contactId, noteText, numberElId) {
                var deferred = $q.defer();
                $http.post('PhoneBook/EditNote', JSON.stringify({
                    contactId: contactId,
                    noteText: noteText,
                    numberElId: numberElId
                })).then(function () {
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
            service.deleteNumber = function (contactId, numberElId) {
                var deferred = $q.defer();
                $http.post('PhoneBook/DeleteNumber/', JSON.stringify({
                    contactId: contactId,
                    numberElId: numberElId
                })).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            service.deleteNote = function (contactId, noteElId) {
                var deferred = $q.defer();
                $http.post('PhoneBook/DeleteNote/', JSON.stringify({
                    contactId: contactId,
                    noteElId: noteElId
                })).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();