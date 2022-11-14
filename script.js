'use strict';

/////////////////////////////////////////////////////////////////////
/////////////Constructor Functions and the new Operator//////////////
/////////////////////////////////////////////////////////////////////
/*
// Create a constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  //   this.caclAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// Call function with "new" operator
const jonas = new Person('Jonas', 1991);
console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}

// Behind the scenes, there have been four steps:
// 1. New empty object is created {}
// 2. Function is called, and in this function call the this keyword will be set to this newly created object. this = {} (in the execution context of the person function the this keyword will point to this new object here that was created in step Number #1)
// 3. Newly created object is linked to a prototype ({} - linked to prototype)
// 4. The object that was created is then autpmatically returned from the constructor function. The object no longer needs to be empty

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

/////////////////////////////////////////////////////////////////////
//////////////////////////Prototypes/////////////////////////////////
/////////////////////////////////////////////////////////////////////

// How prototype work: each and every function in JS automatically has a property called prototype, and that includes constructor functions. Every object, was created by a certain constuctor function wil get access to all the methods and properties that we define on the constructor prototype property

console.log(Person.prototype); // {constructor: ƒ} - calcAge method already there
Person.prototype.caclAge = function () {
  console.log(2037 - this.birthYear);
};

// It works because any object always has access to the methods and properties from it's propotype
jonas.caclAge(); // 46
jack.caclAge(); // 62
matilda.caclAge(); // 20

// Each object has a special property {}.__proto__
console.log(jonas.__proto__); // {caclAge: ƒ, constructor: ƒ} This is prototype of Jonas, it's not a prototype property but it is simply the prototype. Prototype of the Jonas object is essentially the prototype property of the constructor function
console.log(jonas.__proto__ === Person.prototype); // true
// person.prototype - here ".prototype" is actually not the prototype of person, but it is what's gonna be used as the prototype of all the objects that are created with the person constructor function

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda); // [[Prototype]]: Object species: Homo Sapiens', both objects has "species" in __proto__
console.log(jonas.species, matilda.species); // Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false - necause this property is not really inside of the Jonas object, it simply has access to it, because it's in the prototype property of person
// It works because prototype chain

/////////////////////////////////////////////////////////////////////
///////////////Prototypal Inheritance on Built-In Objects////////////
/////////////////////////////////////////////////////////////////////

console.log(jonas.__proto__); // This is the prototype of Jonas which is exactly the prototype property of person (contains "calcAge" function and "species" property)
console.log(jonas.__proto__.__proto__); // This is prototype property of Object (constructor: ƒ Object())

console.log(jonas.__proto__.__proto__.__proto__); // null - because Object.prototype is usually the top scope chain

console.log(Person.prototype.constructor); // Get function itself (ƒ (firstName, birthYear) {...)
console.dir(Person.prototype.constructor); // Get function (ƒ Person(firstName, birthYear)) - here we see the constructor property points back at Person (name: "Person")

// Prototype of Arrays
const arr = [3, 6, 6, 5, 6, 9, 9]; // as using new Array === []
console.log(arr.__proto__); // [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …] here we have all methods of arrays

// Each array not contain all methods, but instead, each array will inherent these methods from it's prototype
console.log(arr.__proto__ === Array.prototype); // true. The prototype property of the constructor is gonna be the prototype of all the objects by that constructor
console.log(arr.__proto__.__proto__); // Object.prototype with all methods are  of objects (arr.__proto__ - is itself Object!!!)

// Add method "unique" to all arrays (all arrays wiull inherit this method)
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); // [3, 6, 5, 9]

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

/////////////////////////////////////////////////////////////////////
////////////////////////CODING CHALLENGE #1//////////////////////////
/////////////////////////////////////////////////////////////////////

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.brake();

// mercedes.accelerate();
// mercedes.brake();
*/
/////////////////////////////////////////////////////////////////////
////////////////////////////ES6 Classes//////////////////////////////
/////////////////////////////////////////////////////////////////////
/*
// Classes in JavaScript is "syntatic sugar"

// Let's implement person using a class (class is a special type of functions)

// Class expression
// const PersonCl = class {};

// Class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear); // [[Prototype]]:Object calcAge:ƒ calcAge()
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica); // PersonCl {firstName: 'Jessica', birthYear: 1996}
jessica.calcAge(); // 41

console.log(jessica.__proto__); // {constructor: ƒ, calcAge: ƒ}
console.log(jessica.__proto__ === PersonCl.prototype); // true

// Add the method manually to the prototype
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet(); // Hey Jessica

// 1. Classes are NOT hoisted
// 2. Classes are first citizens
// 3. Classes are executed in strict mode
*/
/////////////////////////////////////////////////////////////////////
//////////////////////SETTERS AND GETTERS////////////////////////////
/////////////////////////////////////////////////////////////////////

// Every object in JavaScript can have setter and getter properties - these special properties is assessor properties, while normal properties are called data properties
/*
// Getters and setters are functions that get and set a value

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  // Add getter to that object
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // Every setter needs to have exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

// Use the getter
console.log(account.latest); // 300

// Use the setter
account.latest = 50;
console.log(account.movements); // (5) [200, 530, 120, 300, 50]

// How to work with classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear); // [[Prototype]]:Object calcAge:ƒ calcAge()
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Data validation (create s setter for the fullname property which will check is actually a full name)
  // Set a property that already exist
  set fullName(name) {
    console.log(name);
    // _fullName - not a JavaScript feature (for avoid a naming conflict) - we acually create a new valiable (_fullName)
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  // Create a getter for fullName property (because if jessica object does not exist fullName: property, only _fullName)
  get fullName() {
    return this._fullName;
    // _fullName still here, because we do here in the setter, but we can also compute this fullName
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica.age); // 41

// Looks as if it would ve a property of object jessica and not a method

// Get and Set useful for data validation

console.log(jessica);

const walter = new PersonCl('Walter', 1965); // Walter is not a full name!
const walterWhite = new PersonCl('Walter White', 1965); // Walter White
*/
/////////////////////////////////////////////////////////////////////
/////////////////////////STATIC METHODS//////////////////////////////
/////////////////////////////////////////////////////////////////////
/*
// Array.from is basically just a simple function, but its a function that's attached to the Array constructor

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
// Add a static method
Person.hey = function () {
  console.log('Hey there 🙋‍♀️');
  console.log(this);
};
Person.hey(); // Hey there 🙋‍♀️ (this is a object that is calling the method)
const jonas = new Person('Jonas', 1991);

// the Jonas is not in the prototype of the Jonas object
// jonas.hey(); // jonas.hey is not a function

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instante methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);

    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Add a STATIC method
  static hey() {
    console.log('Hey there 🙋‍♀️');
    console.log(this);
  }
}

PersonCl.hey();

/////////////////////////////////////////////////////////////////////
///////////////////////////OBJECT.CREATE/////////////////////////////
/////////////////////////////////////////////////////////////////////

// Create a person class
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // Create a new method
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// This will now return a brand new object, that is linked to the prototype that we passed in here.
// "steven" - is an empty object and will be linked to this PersonProto object which will be its prototype (PersonProto prototype of "steven")
const steven = Object.create(PersonProto);
console.log(steven); // {} (with calcAge function)

// Add properties in object "steven"
// Bad idea:
steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge(); // 35

console.log(steven.__proto__ === PersonProto); // true

// Add new object
const sarah = Object.create(PersonProto);
// Good idea:
sarah.init('Sarah', 1979);
// Checking:
sarah.calcAge(); // 58
*/
/////////////////////////////////////////////////////////////////////
////////////////////////CODING CHALLENGE #2//////////////////////////
/////////////////////////////////////////////////////////////////////
/*
class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCL('ford', 120);
console.log(ford.speedUS); // get read like this

ford.accelerate();
ford.accelerate();
ford.brake();

ford.speedUS = 50;
console.log(ford); // with setter increase by 1.6 (from 50 to 80)
*/

/////////////////////////////////////////////////////////////////////
/////////Inheritance Between "Classes": Constructor Functions////////
/////////////////////////////////////////////////////////////////////
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // Replace the code above with this
  // Person(firstName, birthYear); // doesn't work - because this person constructor function as a regular function call (this function is simply regular function call) this keyword in regular function call is set to undefined

  // make Person(firstName, birthYear) work
  Person.call(this, firstName, birthYear); // call method will indeed cal lthis function but we will be able to specify the this keyword
  this.course = course;
};

// Linking prototypes
// The Student.prototype object is now an object that inherits from Person.prototype. Create conection between Studen and Person
Student.prototype = Object.create(Person.prototype); // Object.create will return an empty object => strudent.prototype is empty, and onto this empty object we can add methods like "introduce"

// Create the method called introduce
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);

// Let's use new introduce method
mike.introduce(); // My name is Mike and I study Computer Science
mike.calcAge(); // 17 Js find this method because "Student.prototype = Object.create(Person.prototype);"

console.log(mike.__proto__); // Person object with introduce method
console.log(mike.__proto__.__proto__); // Prototype object with calcAge function

// It point back to Person
console.log(Student.prototype.constructor);
// JS thinks that the construcot of Studen.Prototype is Person (because we using Object.create)

// Let's fix that:
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

// mike -> Student -> Person -> Object -> Person -> Object -> Object -> Object ->  null
*/
/*


// Try to explain for yourself
const dima = new Person('Dima', 1988, 'Frontend');
console.log(mike.__proto__); // Nesting depth to __proto__: null - 3
console.log(mike.__proto__.__proto__); // Nesting depth to __proto__: null - 2
// In other words mike.__proto__: Student.prototype -> Student.prototype.__proto__: Person.prototype -> Person.prototype.__proto__: null
console.log(mike.__proto__);
console.log(Student.prototype);
console.log(Person.prototype);
console.log(Person.prototype.__proto__); // null
*/

// class Samurai {
//   constructor(name) {
//     this.name = name;
//   }
//   hello() {
//     alert(this.name);
//   }
// }
// let shogun = new Samurai('Dima');
// console.log(shogun.__proto__.__proto__ === Object.prototype);
// console.log(shogun.__proto__.constructor.__proto__ === Function.prototype);
// console.log(shogun.__proto__.__proto__.__proto__ === null);

/////////////////////////////////////////////////////////////////////
////////////////////////CODING CHALLENGE #3//////////////////////////
/////////////////////////////////////////////////////////////////////

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// Create new class as child of another (of Car)
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

// Implement a new methods
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge} %`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
