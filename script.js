var app = angular.module('myApp', []);

app.controller('gameController', gameController);

function gameController($interval, $timeout){
  var vm = this;
  vm.inventory = [];
  vm.balance = 100;
  vm.gameStop = true;
  vm.clickCounter = 0;
  let expire = false;

  function expiredFruit(){
    if (expire === true) {
      for (let item of vm.inventory) {
        if (item.category == 'fruit') {
          item.owned = 0;
        }; //end if
      }; //end for
      expire = false;
    }; //end if
  };

  vm.startGame = function(){
    for (let item of vm.inventory) {
      vm.balance = 100;
      vm.gameStop = false;
      item.setPrice();
      item.changePrice();
    };
    setTimeout(function(){
      vm.gameStop = true;
      alert('Game Over!');
    }, 900000);
  }

    vm.sellItem = function(index){
      if (!vm.gameStop) {
        let item = vm.inventory[index];
        if (item.owned > 0) {
          item.owned --;
          vm.balance += item.price;
        }
        vm.clickCounter++;
        item.expire();
        expiredFruit();
      }
    }

  vm.buyItem = function(index){
    if (!vm.gameStop) {
      let item = vm.inventory[index];
      if (vm.balance >= item.price) {
        vm.balance -= item.price;
        item.owned ++;
        averager(index)
      }
      vm.clickCounter++;
      item.expire();
      expiredFruit();
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
           let z = randomNumber(0.1, 0.9);
           this.price += z
           if (this.price >= 9.99) {
             this.price -= z;
             this.price -= randomNumber(0.1, 0.9);
           }
         }
         else {
           let y = randomNumber(0.1, 0.9);
           this.price -= y
           if (this.price <= 0.5) {
             this.price += y
             this.price += randomNumber(0.1, 0.9);
           }
         }
      }, 15000);
    };
  }; //class end

  class Fruit extends Commodity {
    constructor(name, img, category){
      super(name, img, category);
    };
    setPrice(){
      super.setPrice();
    };
    changePrice(){
      super.changePrice();
    };
    expire(){
      if (this.category == 'fruit') {
        if (vm.clickCounter >= 10) {
          expire = true;
          vm.clickCounter = 0;
        };
      };
    };
  };

  class Elec extends Commodity {
    constructor(name, img, category){
      super(name, img, category);
    };
    setPrice(){
      super.setPrice();
    };
    changePrice(){
      $interval(() => {
        let z = randomNumber(0.1, 0.3);
        this.price += z;
     }, 15000);
    }
  };

  class Collect extends Commodity {

  };

  function randomNumber(min, max){
      return mathNumber = (Math.random() * (max - min));
      }

  const fruitArray = [
              ['apple', 'images/apple.png', 'fruit'],
              ['orange', 'images/orange.png', 'fruit'],
              ['banana', 'images/bananas.png', 'fruit'],
              ['grapes', 'images/grapes.png', 'fruit']
            ];
  const elecArray = [
              ['lamp', 'images/lamp.png', 'Small electronic'],
              ['clock', 'images/clock.png', 'Small electronic'],
              ['toaster', 'images/toaster.png', 'Small electronic'],
              ['blue ray player', 'images/blu-ray-player.png', 'Small electronic']
            ];
  const collectArray = [
              ['comic book', 'images/comic-books.png', 'collectible'],
              ['fancy stuffed animal', 'images/stuffed-animal.png', 'collectible'],
              ['jewelry', 'images/jewelry.png', 'collectible'],
              ['wine', 'images/wine.png', 'collectible']
            ]

  for ( let commodity of fruitArray) {
    let fruit = new Fruit(...commodity);
    vm.inventory.push(fruit);
  };
  for ( let commodity of elecArray) {
    let elec = new Elec(...commodity);
    vm.inventory.push(elec);
  };
  for ( let commodity of collectArray) {
    let collect = new Collect(...commodity);
    vm.inventory.push(collect);
  };
}
