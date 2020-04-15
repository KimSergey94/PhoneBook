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
                    for (var i = 0; i < $scope.contacts.length; i++) {
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
            $scope.lastContactId;
            $scope.createContact = function (contact) {
                dataService.addContact(contact).then(function (result) {
                    $scope.notes = [];
                    $scope.numbers = [];
                    $scope.lastContactId = result;
                    fetchNumbersNNotes();
                    for (var i = 0; i < $scope.numbers.length; i++) {
                        dataService.addNumber($scope.lastContactId,
                            document.getElementById('numberEl' + (parseInt(i, 10) + 1)).value);
                    }
                    for (var i = 0; i < $scope.notes.length; i++) {
                        dataService.addNote($scope.lastContactId,
                            document.getElementById('noteEl' + (parseInt(i, 10) + 1)).value);
                    };
                    toastr.success('Contact is created successfully.');
                    $location.path('/');
                }, function () {
                    toastr.error('Error during the contact creation.');
                });
            };
            $scope.addNumberField = function () {
                dataService.addNumberField();
            };
            $scope.addNoteField = function () {
                dataService.addNoteField();
            };
            function fetchNumbersNNotes() {
                var numbers = document.getElementsByClassName('numberEl');
                var notes = document.getElementsByClassName('noteEl');
                $scope.numbers = Array.from(numbers).map((elem => elem));
                $scope.notes = Array.from(notes).map((elem => elem));
            };

            $scope.deleteNumber = function (numberElId) {
                var element = document.getElementById('numberEl' + numberElId);
                var element2 = document.getElementById('delete' + numberElId);
                var numbersNum = document.getElementById('numbersNum');
                var numberDiv = document.getElementById('numberDiv');
                var brs = numberDiv.querySelectorAll('br');
                var numberElements = document.getElementsByClassName('numberEl').length;
                var inpElementsToUpdate = [];
                var delElementsToUpdate = [];
                numbersNum.value = (parseInt(numbersNum.value, 10)) - 1;

                for (var i = (numberElId + 1); i < numberElements + 1; i++) {
                    var inpEl = document.getElementById('numberEl' + i);
                    var delEl = document.getElementById('delete' + i);
                    var input = document.createElement("input");
                    var a = document.createElement("a");
                    var link = document.createTextNode("delete");

                    if (inpEl.classList.contains('Add')) {
                        input.className = "form-control numberEl Add";
                    } else {
                        input.className = "form-control numberEl";
                    }

                    input.style = "display:inline-block";
                    input.id = "numberEl" + (i - 1);
                    input.value = inpEl.value;
                    a.appendChild(link);
                    a.id = 'delete' + (i - 1);
                    a.href = "";
                    a.setAttribute("ng-click", "deleteNumber(" + (i - 1) + ")");
                    inpEl.parentNode.removeChild(inpEl);
                    delEl.parentNode.removeChild(delEl);
                    inpElementsToUpdate.push(input);
                    delElementsToUpdate.push(a);
                }
                for (var counter = 0; counter < numberElements - numberElId + 2; counter++) {
                    var br = brs.length && brs[counter + numberElId - 2];
                    if (br) {
                        br.parentNode.removeChild(br);
                    }
                }

                for (var count = 0; count < delElementsToUpdate.length; count++) {
                    var br = document.createElement("br");
                    numberDiv.appendChild(inpElementsToUpdate[count]);
                    numberDiv.appendChild(delElementsToUpdate[count]);
                    numberDiv.appendChild(br);

                    angular.element(document).injector().invoke(function ($compile) {
                        var scope = angular.element(inpElementsToUpdate[count]).scope();
                        var scope2 = angular.element(inpElementsToUpdate[count]).scope();
                        $compile(inpElementsToUpdate[count])(scope);
                        $compile(delElementsToUpdate[count])(scope2);
                    });
                }
                element.parentNode.removeChild(element);
                element2.parentNode.removeChild(element2);
            };

            $scope.deleteNote = function (noteElId) {
                var element = document.getElementById('noteEl' + noteElId);
                var element2 = document.getElementById('deleteNote' + noteElId);
                var notesNum = document.getElementById('notesNum');
                var noteDiv = document.getElementById('noteDiv');
                var brs = noteDiv.querySelectorAll('br');
                var noteElements = document.getElementsByClassName('noteEl').length;
                var inpElementsToUpdate = [];
                var delElementsToUpdate = [];
                notesNum.value = (parseInt(notesNum.value, 10)) - 1;

                for (var i = (noteElId + 1); i < noteElements + 1; i++) {
                    var inpEl = document.getElementById('noteEl' + i);
                    var delEl = document.getElementById('deleteNote' + i);
                    var input = document.createElement("input");
                    var a = document.createElement("a");
                    var link = document.createTextNode("delete");

                    if (inpEl.classList.contains('Add')) {
                        input.className = "form-control noteEl Add";
                    } else {
                        input.className = "form-control noteEl";
                    }

                    input.style = "display:inline-block";
                    input.id = "noteEl" + (i - 1);
                    input.value = inpEl.value;
                    a.appendChild(link);
                    a.id = 'deleteNote' + (i - 1);
                    a.href = "";
                    a.setAttribute("ng-click", "deleteNote(" + (i - 1) + ")");
                    inpEl.parentNode.removeChild(inpEl);
                    delEl.parentNode.removeChild(delEl);
                    inpElementsToUpdate.push(input);
                    delElementsToUpdate.push(a);
                }
                for (var counter = 0; counter < noteElements - noteElId + 2; counter++) {
                    var br = brs.length && brs[counter + noteElId - 1];
                    if (br) {
                        br.parentNode.removeChild(br);
                    }
                }

                for (var count = 0; count < delElementsToUpdate.length; count++) {
                    var br = document.createElement("br");
                    noteDiv.appendChild(inpElementsToUpdate[count]);
                    noteDiv.appendChild(delElementsToUpdate[count]);
                    noteDiv.appendChild(br);

                    angular.element(document).injector().invoke(function ($compile) {
                        var scope = angular.element(inpElementsToUpdate[count]).scope();
                        var scope2 = angular.element(inpElementsToUpdate[count]).scope();
                        $compile(inpElementsToUpdate[count])(scope);
                        $compile(delElementsToUpdate[count])(scope2);
                    });
                }
                element.parentNode.removeChild(element);
                element2.parentNode.removeChild(element2);
            };
        }])
        .controller('editContactCtrl', ['$scope', '$routeParams', '$location', 'dataService',
            function ($scope, $routeParams, $location, dataService) {
                $scope.contact = {};

                dataService.getContactById($routeParams.id).then(function (result) {
                    $scope.contact = result;
                    document.getElementById('contactId').value = $routeParams.id;

                    dataService.getNotes($routeParams.id).then(function (result) {
                        $scope.notes = result;
                        var notesNum = document.getElementById('notesNum');
                        notesNum.value = $scope.notes.length;
                        for (var i = 1; i < $scope.notes.length + 1; i++) {
                            addNoteFields(i)
                        }
                    });
                    dataService.getNumbers($routeParams.id).then(function (result) {
                        $scope.numbers = result;
                        var numbersNum = document.getElementById('numbersNum');
                        numbersNum.value = $scope.numbers.length;
                        for (var i = 1; i < $scope.numbers.length + 1; i++) {
                            addNumberFields(i)
                        }
                    });

                }, function () {
                    toastr.error('Error in fetching the contact with Id = ' + $routeParams.id);
                });


                function addNoteFields(i) {
                    var node = document.createElement("input");
                    var noteDiv = document.getElementById('noteDiv');
                    var br = document.createElement("br");
                    var a = document.createElement("a");
                    var link = document.createTextNode("delete");
                    node.className = "form-control noteEl";
                    node.style = "display:inline-block";
                    node.id = "noteEl" + i;
                    noteDiv.appendChild(node);
                    node.value = $scope.notes[i - 1];
                    a.appendChild(link);
                    a.id = "deleteNote" + i;
                    a.href = "";
                    a.setAttribute("ng-click", "deleteNote(" + document.getElementById('contactId').value + " ," + i + ")");
                    noteDiv.appendChild(a);
                    noteDiv.appendChild(br);

                    angular.element(document).injector().invoke(function ($compile) {
                        var scope = angular.element(a).scope();
                        $compile(a)(scope);
                    });
                }

                function addNumberFields(i) {
                    var node = document.createElement("input");
                    var numberDiv = document.getElementById('numberDiv');
                    var br = document.createElement("br");
                    var a = document.createElement("a");
                    var link = document.createTextNode("delete");
                    node.className = "form-control numberEl";
                    node.style = "display:inline-block";
                    node.id = "numberEl" + i;
                    numberDiv.appendChild(node);
                    node.value = $scope.numbers[i - 1];
                    a.appendChild(link);
                    a.id = "delete" + i;
                    a.href = "";
                    a.setAttribute("ng-click", "deleteNumber(" + document.getElementById('contactId').value + " ," + i + ")");
                    numberDiv.appendChild(a);
                    numberDiv.appendChild(br);

                    angular.element(document).injector().invoke(function ($compile) {
                        var scope = angular.element(a).scope();
                        $compile(a)(scope);
                    });
                }
                $scope.addNumberField = function () {
                    dataService.addNumberField();
                };
                $scope.addNoteField = function () {
                    dataService.addNoteField();
                };

                function fetchNumbersNNotes() {
                    var numbers = document.getElementsByClassName('numberEl');
                    var notes = document.getElementsByClassName('noteEl');
                    $scope.numbers = Array.from(numbers).map((elem => elem));
                    $scope.notes = Array.from(notes).map((elem => elem));
                };

                $scope.updateContact = function (contact) {
                    dataService.editContact(contact).then(function () {
                        $scope.numbers = [];
                        $scope.notes = [];
                        fetchNumbersNNotes();

                        for (var i = 0; i < $scope.numbers.length; i++) {
                            var numberElId = parseInt(i, 10) + 1;
                            var element = document.getElementById('numberEl' + numberElId);
                            if (element.classList.contains('Add')) {
                                dataService.addNumber(contact.Id, element.value);
                            } else {
                                dataService.editNumber(contact.Id, element.value, numberElId);
                            }
                        }
                        for (var i = 0; i < $scope.notes.length; i++) {
                            var numberElId = parseInt(i, 10) + 1;
                            var element = document.getElementById('noteEl' + numberElId);
                            if (element.classList.contains('Add')) {
                                dataService.addNote(contact.Id, element.value);
                            } else {
                                dataService.editNote(contact.Id, element.value, numberElId);
                            }
                        };

                        toastr.success('Contact updating is completed successfully.');
                        $location.path('/');
                    }, function () {
                        toastr.error('Error in updating the contact.');
                    });
                };

                $scope.deleteNumber = function (contactId, numberElId) {
                    var element = document.getElementById('numberEl' + numberElId);
                    if (!element.classList.contains('Add')) {
                        dataService.deleteNumber(contactId, numberElId);
                    }

                    var element2 = document.getElementById('delete' + numberElId);
                    var numbersNum = document.getElementById('numbersNum');
                    var numberDiv = document.getElementById('numberDiv');
                    var brs = numberDiv.querySelectorAll('br');
                    var numberElements = document.getElementsByClassName('numberEl').length;
                    var inpElementsToUpdate = [];
                    var delElementsToUpdate = [];
                    numbersNum.value = (parseInt(numbersNum.value, 10)) - 1;

                    for (var i = (numberElId + 1); i < numberElements + 1; i++) {
                        var inpEl = document.getElementById('numberEl' + i);
                        var delEl = document.getElementById('delete' + i);
                        var input = document.createElement("input");
                        var a = document.createElement("a");
                        var link = document.createTextNode("delete");

                        if (inpEl.classList.contains('Add')) {
                            input.className = "form-control numberEl Add";
                        } else {
                            input.className = "form-control numberEl";
                        }

                        input.style = "display:inline-block";
                        input.id = "numberEl" + (i - 1);
                        input.value = inpEl.value;
                        a.appendChild(link);
                        a.id = 'delete' + (i - 1);
                        a.href = "";
                        a.setAttribute("ng-click", "deleteNumber(" + contactId + "," + (i - 1) + ")");
                        inpEl.parentNode.removeChild(inpEl);
                        delEl.parentNode.removeChild(delEl);
                        inpElementsToUpdate.push(input);
                        delElementsToUpdate.push(a);
                    }
                    for (var counter = 0; counter < numberElements - numberElId + 1; counter++) {
                        var br = brs.length && brs[counter + numberElId - 1];
                        if (br) {
                            br.parentNode.removeChild(br);
                        }
                    }

                    for (var count = 0; count < delElementsToUpdate.length; count++) {
                        var br = document.createElement("br");
                        numberDiv.appendChild(inpElementsToUpdate[count]);
                        numberDiv.appendChild(delElementsToUpdate[count]);
                        numberDiv.appendChild(br);

                        angular.element(document).injector().invoke(function ($compile) {
                            var scope = angular.element(inpElementsToUpdate[count]).scope();
                            var scope2 = angular.element(inpElementsToUpdate[count]).scope();
                            $compile(inpElementsToUpdate[count])(scope);
                            $compile(delElementsToUpdate[count])(scope2);
                        });
                    }
                    element.parentNode.removeChild(element);
                    element2.parentNode.removeChild(element2);
                };

                $scope.deleteNote = function (contactId, noteElId) {
                    var element = document.getElementById('noteEl' + noteElId);
                    if (!element.classList.contains('Add')) {
                        dataService.deleteNote(contactId, noteElId);
                    }

                    var element2 = document.getElementById('deleteNote' + noteElId);
                    var notesNum = document.getElementById('notesNum');
                    var noteDiv = document.getElementById('noteDiv');
                    var brs = noteDiv.querySelectorAll('br');
                    var noteElements = document.getElementsByClassName('noteEl').length;
                    var inpElementsToUpdate = [];
                    var delElementsToUpdate = [];
                    notesNum.value = (parseInt(notesNum.value, 10)) - 1;

                    for (var i = (noteElId + 1); i < noteElements + 1; i++) {
                        var inpEl = document.getElementById('noteEl' + i);
                        var delEl = document.getElementById('deleteNote' + i);
                        var input = document.createElement("input");
                        var a = document.createElement("a");
                        var link = document.createTextNode("delete");

                        if (inpEl.classList.contains('Add')) {
                            input.className = "form-control noteEl Add";
                        } else {
                            input.className = "form-control noteEl";
                        }

                        input.style = "display:inline-block";
                        input.id = "noteEl" + (i - 1);
                        input.value = inpEl.value;
                        a.appendChild(link);
                        a.id = 'deleteNote' + (i - 1);
                        a.href = "";
                        a.setAttribute("ng-click", "deleteNote(" + contactId + "," + (i - 1) + ")");
                        inpEl.parentNode.removeChild(inpEl);
                        delEl.parentNode.removeChild(delEl);
                        inpElementsToUpdate.push(input);
                        delElementsToUpdate.push(a);
                    }
                    for (var counter = 0; counter < noteElements - noteElId + 1; counter++) {
                        var br = brs.length && brs[counter + noteElId - 1];
                        if (br) {
                            br.parentNode.removeChild(br);
                        }
                    }

                    for (var count = 0; count < delElementsToUpdate.length; count++) {
                        var br = document.createElement("br");
                        noteDiv.appendChild(inpElementsToUpdate[count]);
                        noteDiv.appendChild(delElementsToUpdate[count]);
                        noteDiv.appendChild(br);

                        angular.element(document).injector().invoke(function ($compile) {
                            var scope = angular.element(inpElementsToUpdate[count]).scope();
                            var scope2 = angular.element(inpElementsToUpdate[count]).scope();
                            $compile(inpElementsToUpdate[count])(scope);
                            $compile(delElementsToUpdate[count])(scope2);
                        });
                    }
                    element.parentNode.removeChild(element);
                    element2.parentNode.removeChild(element2);
                };
            }]);
})();