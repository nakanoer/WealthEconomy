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

    var controllerId = 'organizationEditController';
    angular.module('main')
        .controller(controllerId, ['organizationService',
            'sectorService',
            'licenseService',
            'logger',
            '$location',
            '$routeParams',
            organizationEditController]);

    function organizationEditController(organizationService,
		sectorService,
		licenseService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/Organization/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.sectorSet = [];
        vm.licenseSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.organization = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/Organization/');

            if (organizationService.hasChanges()) {
                organizationService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return organizationService.hasChanges();
        }

        function initialize() {

            sectorService.getSectorSet(false)
                .then(function (data) {
                    vm.sectorSet = data;
                });

            // TODO Catch?

            licenseService.getLicenseSet(false)
                .then(function (data) {
                    vm.licenseSet = data;
                });

            // TODO Catch?

            if (isNew) {
                // TODO Only for development, create test entity ?!
            }
            else {
                organizationService.getOrganization($routeParams.Id)
                    .then(function (data) {
                        vm.organization = data;
                    })
                    .catch(function (error) {
                        logger.logError("Boooo, we failed: " + error.message, null, true);
                        // Todo: more sophisticated recovery. 
                        // Here we just blew it all away and start over
                        // refresh();
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !organizationService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                organizationService.createOrganization(vm.organization);
            }

            isSaving = true;
            return organizationService.saveChanges()
                .then(function () {
                    logger.logSuccess("Hooray we saved", null, true);
                    $location.path('/Organization/');
                })
                .catch(function (error) {
                    logger.logError("Boooo, we failed: " + error.message, null, true);
                    // Todo: more sophisticated recovery. 
                    // Here we just blew it all away and start over
                    // refresh();
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();
