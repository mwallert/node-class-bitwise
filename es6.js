'use strict';

// function foo() {
//   console.log(arguments);
// }
//
// foo(1,2,3,4,5);

////Rest Parameters
// const adder = (...numbers) => numbers.reduce((acc, val) => acc += val, 0);
// console.log(adder(1,2,3,4,5,6));
//
////Spread Parameters
// const subtract = (a,b) => a - b;
//       numbers = [10,2];
//       console.log(subtract(...numbers));

////Template Strings
// const template = `6 - 2 = ${subtract(6,2)}`;
// console.log(template);

////Destructuring
// let [a,b,c] = [1,2,3];
// console.log('a = 1', a === 1);
// console.log('b = 2', b === 2);
// console.log('c = 3', c === 3);
// console.log('c = 4', c === 4);

////alternative object syntax
// const foo = 'bar',
//       baz = 'bleep';
//
// const obj = {
//   foo,
//   baz,
//   sayFoo () {
//     console.log(this.foo);
//   }
// };
//
// obj.sayFoo();

////classes

class Person {
  constructor(firstName, middleName, lastName, ...data){
    this.first = firstName;
    this.middle = middleName;
    this.last = lastName;
    this.data = data;
  }

  greet() {
    console.log(`Hello there, ${this.first} ${this.middle} ${this.last}`);
  }

  logData () {
    this.data.forEach(item => console.log(item));
  }
}

const arr = ['Michael', 'Alan', 'Fillmore Wallert', 24, 0],
      michael = new Person(...arr);
michael.greet();
michael.logData();
