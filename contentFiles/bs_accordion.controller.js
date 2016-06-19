angular.module("umbraco").controller("bs_accordion.controller", function ($scope, notificationsService) {
    $scope.control.PluginHeader = $scope.control.Header ? $scope.control.Header : "Bootstrap Accordion";
    $scope.control.UniqueId = $scope.control.$uniqueId;
    //$scope.control.panel_group = $scope.control;
});