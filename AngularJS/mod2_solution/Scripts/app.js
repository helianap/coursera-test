(function () {
    'use strict';
   
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      
        var toBuy = this;

 
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.addItem = function (itemName, itemQuantity, itemIndex) {
                                     
            ShoppingListCheckOffService.addItem(itemName, itemQuantity);
            ShoppingListCheckOffService.removeItem(itemIndex);
            toBuy.message = ShoppingListCheckOffService.checkToBuy();
            
        };
       
    };


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {

        var itemBought = this;

        itemBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

        itemBought.message = ShoppingListCheckOffService.checkBought();
       
    };
    
    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
                            { name: "Candies", quantity: 10 },
                            { name: "Pizzas", quantity: 5 },
                            { name: "Cans of Pop", quantity: 5 },
                            { name: "Chocolates", quantity: 3 },
                            { name: "Cheese Sticks", quantity: 6 }
                        ];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        var boughtItems = [];

        service.addItem = function (itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            boughtItems.push(item);
        };

        service.removeItem = function (itemIdex) {
            toBuyItems.splice(itemIdex, 1);
        };

        service.getAlreadyBoughtItems = function () {

            return boughtItems;
        };

        service.checkToBuy = function () {
            
            if (toBuyItems.length === 0)
                return "Everything is bought!";
            else
                return "";
        };

        service.checkBought = function () {

            if (boughtItems.length === 0)
                return "Nothing bought yet.";
            else
                return "";
        };
    };

    
})();