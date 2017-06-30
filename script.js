var app = angular.module('myApp', []);

app.controller('gameController', gameController);

function gameController($interval){
  var vm = this;
  vm.inventory = [];
  vm.balance = 100;

    vm.sellItem = function(index){
      console.log(index);
      let item = vm.inventory[index];
      if (item.owned > 0) {
        item.owned --;
        vm.balance += item.price;
      }
    }

  vm.buyItem = function(index){
    let item = vm.inventory[index];
    if (vm.balance >= item.price) {
      vm.balance -= item.price;
      item.owned ++;
      averager(index)
    }
  }

  function averager(index){
   let item = vm.inventory[index];
   item.pricesArray.push(item.price);
   let sum = item.pricesArray.reduce((previous, current) => current += previous);
    item.averageDisplay = sum / item.pricesArray.length;
 }


  class Commodity {
    constructor(name, img, category){
    this.price = 0;
    this.name = name;
    this.img = img;
    this.category = category
    this.pricesArray = [];
    this.averageDisplay = 0;
    this.owned = 0;
  }; //constructor end
    setPrice(){
      this.price += randomNumber(0.5, 9.99)
    };
    changePrice() {
       $interval(() => {
         let x = randomNumber(0, 9);
         if (x >= 5) {
           let z = randomNumber(0.5, 1);
           this.price += z
           if (this.price >= 9.99) {
             this.price -= z;
             this.price -= randomNumber(0.5, 1);
           }
         }
         else {
           let y = randomNumber(0.5, 1);
           this.price -= y
           if (this.price <= 0.5) {
             this.price += y
             this.price += randomNumber(0.5, 1);
           }
         }
    }, 15000);
  };
  } //class end

  function randomNumber(min, max){
      return mathNumber = (Math.random() * (max - min));
      }

  const itemsArray = [
              ['apple', 'images/apple.png', 'fruit'],
              ['orange', 'images/orange.png', 'fruit'],
              ['banana', 'images/bananas.png', 'fruit'],
              ['grapes', 'images/grapes.png', 'fruit'],
              ['lamp', 'images/lamp.png', 'Small electronic'],
              ['clock', 'images/clock.png', 'Small electronic'],
              ['toaster', 'images/toaster.png', 'Small electronic'],
              ['blue ray player', 'images/blu-ray-player.png', 'Small electronic'],
              ['comic book', 'images/comic-books.png', 'collectible'],
              ['fancy stuffed animal', 'images/stuffed-animal.png', 'collectible'],
              ['jewelry', 'images/jewelry.png', 'collectible'],
              ['wine', 'images/wine.png', 'collectible']
            ]

  for ( let commodity of itemsArray) {
    let item = new Commodity(...commodity);
    item.setPrice();
    item.changePrice();
    vm.inventory.push(item);
  }
}
