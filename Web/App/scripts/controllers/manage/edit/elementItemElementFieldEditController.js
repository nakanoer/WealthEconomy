//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'elementItemElementFieldEditController';
    angular.module('main')
        .controller(controllerId, ['elementItemElementFieldService',
            'elementFieldService',
            'elementItemService',
            'logger',
            '$location',
            '$routeParams',
            elementItemElementFieldEditController]);

    function elementItemElementFieldEditController(elementItemElementFieldService,
		elementFieldService,
		elementItemService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/elementItemElementField/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.elementFieldSet = [];
        vm.elementItemSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.elementItemElementField = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/manage/elementItemElementField');

            if (elementItemElementFieldService.hasChanges()) {
                elementItemElementFieldService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return elementItemElementFieldService.hasChanges();
        }

        function initialize() {

            elementFieldService.getElementFieldSet(false)
                .then(function (data) {
                    vm.elementFieldSet = data;
                });

            elementItemService.getElementItemSet(false)
                .then(function (data) {
                    vm.elementItemSet = data;
                });

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                elementItemElementFieldService.getElementItemElementField($routeParams.Id)
                    .then(function (data) {
                        vm.elementItemElementField = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !elementItemElementFieldService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                elementItemElementFieldService.createElementItemElementField(vm.elementItemElementField);
            } else {
                // To be able to do concurrency check, RowVersion field needs to be send to server
				// Since breeze only sends the modified fields, a fake modification had to be applied to RowVersion field
                var rowVersion = vm.elementItemElementField.RowVersion;
                vm.elementItemElementField.RowVersion = '';
                vm.elementItemElementField.RowVersion = rowVersion;
            }

            isSaving = true;
            elementItemElementFieldService.saveChanges()
                .then(function (result) {
                    $location.path('/manage/elementItemElementField');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (error.status === '409') {
                        // TODO Try to recover!
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();