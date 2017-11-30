var myApp = angular.module('RestaurantApp', []);//dont have to be the same, but should

myApp.controller('FoodController', ['$http', function($http){
    console.log('food controller has been loaded');
    var self = this;
    self.message = 'Zip Zap partner';

    self.foodArray = [];//for the ul

    self.newFood = { is_hot: false};

    self.getFood = function(){
        $http({
            method: 'GET',
            url: '/food',
        }).then(function(response) {
            console.log('response', response.data);
            self.foodArray = response.data;
        });
    };

    self.addNewFood = function (newFood){
        $http({
            method: 'POST',
            url: '/food',
            data: newFood
        }).then(function(response){
            console.log('response', response);
            self.newFood = { is_hot: false};
            self.getFood();
        });
    
    };
    
    self.getFood(); 

    
}]);//call it in the index, has to be inside of ng-app
    