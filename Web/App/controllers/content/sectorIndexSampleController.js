﻿(function () {
    'use strict';

    var controllerId = 'sectorIndexSampleController';
    angular.module('main')
        .controller(controllerId, ['userService', '$rootScope', 'logger', sectorIndexSampleController]);

    function sectorIndexSampleController(userService, $rootScope, logger) {

        logger = logger.forSource(controllerId);

        var vm = this;
        vm.authorized = false;
        vm.sectorIndex_SampleResourcePoolId = 4;

        // Logged in?
        userService.getUserInfo()
            .then(function (userInfo) {
                vm.authorized = true;
            });

        // User logged out
        $rootScope.$on('userLoggedOut', function () {
            vm.authorized = false;
        });
    };
})();
