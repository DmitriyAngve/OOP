'use strict';

/////////////////////////////////////////////////////////////////////
/////////////Constructor Functions and the new Operator//////////////
/////////////////////////////////////////////////////////////////////

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
