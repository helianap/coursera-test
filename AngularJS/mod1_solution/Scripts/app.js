(function () {
    'use strict';
   
    angular.module('LunchCheck', []).
    controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope)
    {
        $scope.message = '';
        $scope.lunchmenu = '';
        $scope.selectedcss ='';
        $scope.CheckIfTooMuch = function () {

            if ($scope.lunchmenu != "") {
                var foodItems = $scope.lunchmenu.split(",");
                var total = 0;
                for (var i = 0; i < foodItems.length; i++)
                {
                    //validation for empty strings
                    if(foodItems[i].trim()!="")
                        total++;
                }
                if (total === 0 ){
                    $scope.message = 'Please enter data first';
                    $scope.selectedcss = 'red';
                }
                else if (total <= 3 & total > 0) {
                    $scope.message = 'Enjoy!';
                    $scope.selectedcss = 'green';
                }                   
                else if (total > 3){
                    $scope.message = 'Too much!';
                    $scope.selectedcss = 'green';
                }
            }
            else {
                $scope.message = 'Please enter data first';
                $scope.selectedcss = 'red';
            }
                
        };
    }
})();