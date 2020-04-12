(function () {
    'use strict';

    angular
        .module('phoneBook')
        .controller('contactsCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.contacts = [];

            getData();

            getData = function () {
                dataService.getContacts().then(function (result) {
                    $scope.contacts = result;
                });
            }
        }]);
})();
