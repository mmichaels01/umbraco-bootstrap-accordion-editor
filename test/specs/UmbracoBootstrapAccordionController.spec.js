describe('Umbraco Bootstrap Accordion tests', function() {
   var $scope, $location, $rootScope, createController;

   beforeEach(module('umbraco'));

   beforeEach(inject(function ($rootScope, $controller, angularHelper, entityMocks, mocksUtils) {
        
        //mock the scope model
        $scope = $rootScope.$new();
        $scope.model = {
                        alias: "property",
                        label: "Umbraco Bootstrap Accordion property",
                        description: "desc",
                        config: {}
                      };

        //setup the controller for the test by setting its scope to
        //our mocked model
        createController = function() {
            return $controller('UmbracoBootstrapAccordionController', {
                '$scope': $scope
            });
        };
    }));

    it('model.value should be equal to meh', function() {
        var controller = createController();
        
        //initially our model.value is not set
        expect($scope.model.value).toBe(undefined);  
        
        //we then set it to meh
        $scope.model.value = "meh";

        //and the test should pass
        expect($scope.model.value).toBe("meh");
    });

    it('config should be set', function() {
        var controller = createController();
        
        //Our config should not be null
        expect($scope.model.config).not.toBeNull();
    
    });
});