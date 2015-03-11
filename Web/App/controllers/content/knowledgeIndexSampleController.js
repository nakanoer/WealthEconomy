﻿(function () {
    'use strict';

    var controllerId = 'knowledgeIndexSampleController';
    angular.module('main')
        .controller(controllerId, ['userService', '$scope', '$timeout', '$rootScope', 'logger', knowledgeIndexSampleController]);

    function knowledgeIndexSampleController(userService, $scope, $timeout, $rootScope, logger) {

        logger = logger.forSource(controllerId);

        var vm = this;
        vm.authorized = false; // TODO Improve this 'authorized' part?

        vm.oldModelChartConfig = {
            title: {
                text: ''
            },
            options: {
                chart: {
                    type: 'column',
                    height: 358
                },
                plotOptions: {
                    column: {
                        allowPointSelect: true,
                        pointWidth: 15
                    }
                },
                xAxis: { categories: ['Knowledge'] },
                yAxis: {
                    title: {
                        text: 'Development process'
                    },
                    allowDecimals: false,
                    min: 0
                }
            },
            size: {},
            series: [
                { name: "My Precious Jewelry", data: [0] },
                { name: 'Death Star Architecture', data: [0] },
                { name: "Christina's Secret", data: [0] },
                { name: 'Nuka Cola Formula', data: [0] }
            ]
        };

        vm.newModelChartConfig = {
            title: {
                text: ''
            },
            options: {
                chart: {
                    type: 'column',
                    height: 300
                },
                plotOptions: {
                    column: {
                        allowPointSelect: true,
                        pointWidth: 15
                    }
                },
                xAxis: { categories: ['Knowledge'] },
                yAxis: {
                    title: {
                        text: 'Development process'
                    },
                    allowDecimals: false,
                    min: 0
                }
            },
            size: {},
            series: [
                { name: 'Global Knowledge Database', data: [0] }
            ]
        };

        userService.getUserInfo()
            .then(function (userInfo) {

                vm.authorized = true;

                initialize();
            });

        // User logged out
        $rootScope.$on('userLoggedOut', function () {
            vm.authorized = false;
        });

        /*** Implementations ***/

        function initialize() {

            vm.sampleResourcePoolId = 5;
            vm.popuplarSoftwareLicensesResourcePoolId = 6;
            var timeoutInitial = $timeout(refreshPage, 10000);
            var timeoutRecursive = null;

            // When the DOM element is removed from the page,
            // AngularJS will trigger the $destroy event on
            // the scope. This gives us a chance to cancel any
            // pending timer that we may have.
            $scope.$on("$destroy", function (event) {
                $timeout.cancel(timeoutInitial);
                $timeout.cancel(timeoutRecursive);
            });

            //scope.chartConfig.loading = true;
            //scope.chartConfig.title = { text: element.Name };
            //scope.chartConfig.series = [];
            //scope.chartConfig.options.yAxis.title = { text: 'Total Income' };

            //vm.oldSystemChartConfig = {
            //    options: {
            //        plotOptions: {
            //            column: {
            //                allowPointSelect: true,
            //                pointWidth: 15
            //            }
            //        },
            //        xAxis: { categories: [''] },
            //        yAxis: {
            //            allowDecimals: false,
            //            min: 0
            //        }
            //    },
            //    size: {},
            //    series: [
            //        { name: "My Precious Jewelry", data: [0] },
            //        { name: 'Death Star Architecture', data: [0] },
            //        { name: "Christina's Secret", data: [0] },
            //        { name: 'Nuka Cola Formula', data: [0] }
            //    ],
            //    title: {
            //        text: 'test2'
            //    }
            //};

            //vm.oldSystemChartConfig.options.chart = { type: 'pie' };
            //vm.oldSystemChartConfig.options.yAxis.title = { text: 'Total Income' };
            // scope.chartConfig.series.push(item);

            //vm.knowledgeIndex_NewSystemChartConfig = {
            //    options: {
            //        chart: {
            //            type: 'column'
            //        },
            //        plotOptions: {
            //            column: {
            //                allowPointSelect: true,
            //                pointWidth: 15
            //            }
            //        },
            //        xAxis: { categories: [''] },
            //        yAxis: {
            //            allowDecimals: false,
            //            min: 0
            //        }
            //    },
            //    size: {},
            //    series: [
            //        { name: 'Global Knowledge Database', data: [5] }
            //    ]
            //};

            //scope.chartConfig.options.chart = { type: 'column' };
            //scope.chartConfig.options.yAxis.title = { text: 'Total Income' };

            //for (var i = 0; i < element.ElementItemSet.length; i++) {
            //    scope.chartConfig.series.push(item);
            //}

            //vm.knowledgeIndex_OldSystemChartConfig2 = {
            //    title: {
            //        text: ''
            //    },
            //    options: {
            //        chart: {
            //            type: 'column',
            //            height: 358
            //        },
            //        yAxis: {
            //            title: { text: 'Development process' },
            //            min: 0,
            //            allowDecimals: false
            //        },
            //        xAxis: { categories: ['Knowledge'] },
            //        plotOptions: {
            //            column: {
            //                pointWidth: 15
            //            }
            //        }
            //    },
            //    series: [
            //        { name: "My Precious Jewelry", data: [0] },
            //        { name: 'Death Star Architecture', data: [0] },
            //        { name: "Christina's Secret", data: [0] },
            //        { name: 'Nuka Cola Formula', data: [0] }
            //    ]
            //};

            //vm.knowledgeIndex_NewSystemChartConfig2 = {
            //    title: {
            //        text: ''
            //    },
            //    options: {
            //        chart: {
            //            type: 'column',
            //            height: 300
            //        },
            //        yAxis: {
            //            title: { text: 'Development process' },
            //            min: 0,
            //            allowDecimals: false
            //        },
            //        xAxis: { categories: ['Knowledge'] },
            //        plotOptions: {
            //            column: {
            //                pointWidth: 15
            //            }
            //        }
            //    },
            //    series: [
            //        { name: 'Global Knowledge Database', data: [0] }
            //    ]
            //};

            function refreshPage() {

                var organizationIndex = Math.floor(Math.random() * 4);
                vm.oldModelChartConfig.series[organizationIndex].data[0] += 1;
                vm.newModelChartConfig.series[0].data[0] += 1;

                timeoutRecursive = $timeout(refreshPage, 1000);
            }
        }
    };
})();