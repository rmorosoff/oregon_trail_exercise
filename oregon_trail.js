(function(){
   'use strict';

   // Traveler object
   function Traveler(name, food, isHealthy) {
     this.name = name;
     this.food = food;
     this.isHealthy = isHealthy;
   }

   // random integer generator between min and max inclusive to be used for travel's food
   //  found this by googling random # 1 to 10 on MDN (Math.random)
   function getRandomIntInclusive(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
   }

   //  function to create a new traveler
   function makeTraveler (name) {
     //  randomly create amount of food from 1 to 100
     let food = getRandomIntInclusive(1, 100);
     return new Traveler(name, food, true)
   }

   //  Wagon object
   function Wagon(passengers, capacity) {
     this.passengers = passengers;
     this.capacity = capacity;
   }

   //  function to create new wagon
   function makeWagon (capacity) {
     return new Wagon([], capacity)
   }

   //  function to allow traveler to hunt and possibly increase food
   function hunt(huntTraveler) {
     //  randomly generate a hunt success result
     let huntResult = getRandomIntInclusive(1, 100);
     //  if result bigger than 50, then add 100 food points
     if (huntResult > 50) {
       console.log("Hunt was successful, add 100 food points")
       huntTraveler.food = huntTraveler.food + 100;
     } else {
       console.log("Hunt unsuccessful, food points stay the same")
     }
   }

   //  function to allow traveler to eat 20 points of their food
   function eat(eatTraveler) {
     //  only eat if traveler has at least 20 food points
     if (eatTraveler.food >= 20) {
       eatTraveler.food = eatTraveler.food - 20;
       console.log("Traveler still healthy, and new food level is " + eatTraveler.food)
     } else {
       //  traveler trying to eat with less than 20 food points, so is now unhealthy
       eatTraveler.isHealthy = false;
       eatTraveler.food = 0;  //  assume traveler ate what little food they had left
       console.log("Traveler is no longer healthy. Food level is now 0")
     }
   }

   //  function to add a traveler to a wagon, only if there is room
   function join(joinWagon, joinTraveler) {
     //  check is passengers length is less than wagon capacity
     if (joinWagon.passengers.length < joinWagon.capacity) {
       joinWagon.passengers.push(joinTraveler);  //  now push the traveler onto the passengers array
       console.log("Successfully added " + joinTraveler.name + " wagon as there was room")
     } else {
       console.log("Could not add " + joinTraveler.name + " to the wagon  as it was already full")
     }
   }

   //  function to return whether wagon has a sick passenger
   function quarantine(checkWagon) {
     //  initialize boolean to false
     let isQuarantine = false;
     //  loop through passenger array
     for (let i=0; i < checkWagon.passengers.length; i++){
       if (checkWagon.passengers[i].isHealthy === false) {
         //  somebody was sick, so set boolean to true
         isQuarantine = true;
         break;
       }
     }
     return isQuarantine;
   }

   //  function that returns the total number of food points on a wagon
   function food(countWagon) {
     //  initialize foodCount to 0
     let foodCount = 0;
     //  loop through the passengers arry
     for (let i=0; i < countWagon.passengers.length; i++) {
       //  increment foodCount by current passenger's food
       foodCount = foodCount + countWagon.passengers[i].food;
     }
     return foodCount;
   }

   // Create a wagon called 'wagon'
   let wagon = makeWagon(5);
   // Create a traveler with the name 'Henrietta' called 'traveler'
   let traveler = makeTraveler('Henrietta');
   // Create a traveler with the name 'Juan' called 'traveler2'
   let traveler2 = makeTraveler('Juan');

   console.log(traveler);
   console.log(traveler2);
   console.log(wagon);

   hunt(traveler); // maybe get more food
   console.log(traveler);

   eat(traveler2);
   console.log(traveler2);
   eat(traveler2); // juan is hungry
   console.log(traveler2);

   //  now lets add travelers to the wagon, if there is room
   join(wagon, traveler);
   console.log(wagon);
   join(wagon, traveler2);
   console.log(wagon);

   //  output appropriate message based on truth value of quarantine function
   if (quarantine(wagon)) {
     console.log("Somebody is sick on that there wagon")
   }
     else {
       console.log("All passengers are healthy on that there wagon")
     }

     //  output the total count of food from all passengers on wagon
  console.log("The total amount of food on the wagon is " + food(wagon));

  //  create 3 more travelers
  let traveler3 = makeTraveler('Travis');
  let traveler4 = makeTraveler('Jill');
  let traveler5 = makeTraveler('Jack');

  //  join those new travelers to the wagon
  join(wagon, traveler3);
  join(wagon, traveler4);
  join(wagon, traveler5);
  console.log(wagon);

  //  now try to join a 6th traveler to the wagon
  let traveler6 = makeTraveler('Toomany');
  join(wagon, traveler6);





 }())
