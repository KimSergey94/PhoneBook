(function () {
    'use strict';

    angular
        .module('phoneBook')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getContacts = function () {
                var deferred = $q.defer();
                $http.get('/phoneBook/Index').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            return service;
        }]);
})();