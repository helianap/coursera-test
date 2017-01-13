(function () {
    'use strict';
   
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json')
    .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'menuItems.html',
            scope: {
                list: '=myList'
                //remove: '<'
            }
         };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var menu = this;

        menu.nothingFoundInList = function () {
            if(menu.items.length == 0)
                      return true;
             else
                      return false;
        };
    }

   
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      
        var found = [];

        var menu = this;

        menu.searchTerm = "";

        menu.Remove = function (itemIndex) {

            found.splice(itemIndex, 1);
        };

        menu.nothingFoundInList = function()
       {

            if (found.length == 0)
                return true;
            else
                return false;
       };
               
        
        menu.getMatchedMenuItems = function () {

            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

            promise.then(function (response) {

                found = [];
  
                for (var i = 0; i < response.data.menu_items.length; i++) {

                    if (response.data.menu_items[i].description.toLowerCase().indexOf(menu.searchTerm.toLowerCase()) != -1) {
                        found.push(response.data.menu_items[i]);
                    }
                }

                menu.menu_item = found;

                console.log(found)
            })
            .catch(function (error) {
                console.log("Error occurred");
            });

        }
    };


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
  
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            console.log(searchTerm);
            var response = $http({
                method: "GET",
                url: (ApiBasePath)
                
            });

            return response;
        };

      };

    
})();