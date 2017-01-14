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
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var menu = this;

        menu.items = [];

        menu.searched = false;
    }


   
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      
        var found = [];

        var menu = this;

        menu.searchTerm = "";

        menu.removeItem = function (index) {
            menu.items.splice(index, 1);
        }
                  
        
        menu.getMatchedMenuItems = function () {
          
            if (menu.searchTerm)
            {
                var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

                promise.then(function (response) {

                    found = [];

                    for (var i = 0; i < response.data.menu_items.length; i++) {

                        if (response.data.menu_items[i].description.toLowerCase().indexOf(menu.searchTerm.toLowerCase()) != -1) {
                            found.push(response.data.menu_items[i]);
                        }
                    }

                    menu.items = found;
                    menu.searched = true;
                    console.log(menu.items);
                    console.log(menu.items.length);
                })
                .catch(function (error) {
                    console.log("Error occurred");
                });

            }
            
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
