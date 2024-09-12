---
title: 'JavaScript'
name: 'JavaScript'
date: '2023-02-20'
published: true
---


# Introduction to JavaScript

This is not a comprehensive introduction to JavaScript (JS). Instead I am aiming to highlight some of the common "gotchas" when coming to JS from other languages like Java or Python as well as some of the features you will encounter in JavaScript that you will not have seen before.

For a more comprehensive introduction to JavaScript, I suggest the 3rd edition of [Eloquent JavaScript](http://eloquentjavascript.net/3rd_edition/index.html).

Why do we care about JavaScript? It is the language embedded in the browser that allows us to programmatically manipulate the page (our topic for the next session). Increasingly JavaScript is also used on the server (that is not just in the browser).

## History and standardization

A little context. Java is to JavaScript as Ham is to Hamburger. JavaScript was
created in 1995 at Netscape (in 10 days!) and was named as a marketing ploy to
capitalize on the growing popularity of Java (although Sun, then Oracle, owned
the trademark).

JavaScript was standardized into ECMAScript, and thus JavaScript is a dialect
of ECMAScript. After a period of divergence in the browser wars era, the
various vendors (namely the browser creators) are now more faithfully
implementing the standard.

There are numerous implementations:

- V8 (Chrome and Node)
- Spidermonkey (Firefox)
- Nitro (WebKit, Safari)
- Chakra (IE Edge)
- ...

Not all engines support all features. We will be using ECMAScript 2020,
an update to the standard that adds numerous helpful features. Fortunately, at
this point [almost all modern
browsers](https://kangax.github.io/compat-table/es2016plus/) support the 2020
specification. That is not necessarily true for newer features (newer than 2020)
or older browsers.


## JavaScript notes

JavaScript is a very pragmatic language that has evolved to meet user needs as
opposed to being formally "designed" (recall the first version created in 10
days...). As a result there is more than one way to do something, and not all
are good. There was (is) a quite famous book ["JavaScript: The Good
Parts"](http://shop.oreilly.com/product/9780596517748.do), promoted as:

> Most programming languages contain good and bad parts, but JavaScript has
> more than its share of the bad, having been developed and released in a hurry
> before it could be refined. This authoritative book scrapes away these bad
> features to reveal a subset of JavaScript that's more reliable, readable, and
> maintainable than the language as a whole—a subset you can use to create
> truly extensible and efficient code.

Over the last few years, JavaScript has really grown up to be a decent language. Perhaps not a great one, but a decent one. However, be careful reading online suggestions/tutorials. Some are good, some are
(very) outdated, some are opinionated in good ways, some are opinionated in bad ways,
and some are just wrong.


Some examples of those gotchas mentioned earlier...

### Type coercions

JavaScript does automatic type coercion, which can catch you out at odd moments when it isn't clear which value will be coerced. 

``` javascript
const x = '42';
console.log(x + 1);
```

This will print out the string `'421'`. The `+` operator is acting as string concatenation, so the `1` is converted to a string and the then string `'42'` and `'1'` are concatenated together.

``` javascript
const x = '42';
console.log(x - 1);
```

This will print out the value `41`. The `-` operator isn't valid for strings, so the `'42'` is converted to an integer and we subtract 1 from 42. 

``` javascript
const x = '42';
console.log(+x + 1);
```

This will print out the value 43. The first `+` is actually the unary plus, which you have probably never used before (it is much less useful than the unary minus). It is only applicable to numbers, so the `'42'` becomes the number 42, which is then added to the 1 to get 43. 

Why does this matter (and why does JavaScript work this way)? In JavaScript we get values from outside of our code from HTML forms or through data files that are read in. By default _all_ values arrive in JavaScript as strings. The type coercion facility is designed to ease that burden by allowing you to just treat the values as numbers anyway. This largely works... unless you try to add one of these values to another number. The unary plus trick is a common one for forcing values to either be numbers or throw an error before you make a mistake like this. 

### Equality (and truthiness)

Use `===` instead of `==` ([ESLint](https://eslint.org/docs/rules/eqeqeq.html)).

```
$ node
> 5 == "5"
true
> 5 === "5"
false
```

This is related to type coercion. The `==` does its best to coerce the two sides to have the same type, and sometimes in hard to reason about ways. The `===` is type safe -- it doesn't so any conversions. On the face of it, it seems like you would want to use `==` for the auto-conversion, but the reality is that more often than not it just pushes type issues deeper into your code. Just use `===`.

### Variable declarations

JavaScript is dynamically typed like Python and can define variables like Python, e.g.

```javascript
x = 42;
```

but doing so makes a global variables and pollutes the global namespace
([ESLint](https://eslint.org/docs/rules/no-undef)). Instead we should declare
all variables as block scoped with `const`, if possible, or `let`
([ESLint](https://eslint.org/docs/rules/prefer-const)). `const` specifies that
a variable will not be reassigned. However, those are ES6 features and so you
will also see `var` declarations, e.g.

```javascript
var x = 42;
```

Prior to ES6, `var` was the only form of declaration. `var` has function-level
scope (even if you re-declare a variable), instead of the more familiar
block-level scope of `const` and `let`. That is, all `var`s are "hoisted" to the
top of the function (or globally). As a result the latter is preferred to avoid
tricky bugs like the following. You should use `const` or `let`, but be aware
you will likely see examples with `var`.

As an example compare the two following functions (adapted from MDN):

```javascript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;
    console.log(x);
  }
  console.log(x); // What will print here?
}
```

```javascript
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;
    console.log(x);
  }
  console.log(x); // What will print here?
}
```

_All of my code and examples use `const` and `let` exclusively. I expect your code to do that same. There is a **lot** of example code out there that still uses `var`. A good way to communicate to me "I found this online and didn't take the time to understand what I copied and pasted" would be to submit code that uses `var`._



#### Declaring functions

Functions in JavaScript are first class citizens, which is to say they can be passed around as values. This happens so often, that there is a special abbreviated syntax called ["fat arrow syntax"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for writing short anonymous functions in place. 

That means that we can we have five different ways to declare functions.

**Function declaration**

This looks the closest to what you have seen in other languages.

```javascript
function double(x){
    return x * 2
}
```

**Function expression**

We can create _anonymous_ (unnamed) functions and use them as expressions. Here we are assigning it to the variable `double` so that it largely works the same as the **function declaration**, but we could also pass a function expression into a function as an argument (this goes for all of the function expressions below -- the assignment statement is just for completeness; it is only the right hand side that is the function expression). 

```javascript
const double = function(x){
    return x * 2;
}
```

**Named function expression**

This is the same as above, but we can add a name that could be used internally (perhaps for recursion) and will show up in stack traces.

```javascript
const double = function f(x){
    return x * 2;
}
```

**Function expression (fat arrow syntax)**

In this shorter form we get rid of the `function` keyword and use `=>` to indicate that it is a function. Note that you need the leading parentheses even if there aren't any arguments (just like we would in conventional function declarations).

```javascript
const double = (x) => { 
    return x * 2;
};
```

Arrow functions and anonymous functions created with `function` have subtle differences that won't matter much for us.

<details>
<summary>Click for details if you already know some JS</summary>

**Details** Arrow functions don't have their own `this` and close over the `this` of the enclosing scope when they are defined. Functions defined with the `function` keyword have their own `this` and that `this` is set differently based on how they are called. This probably doesn't make any sense to you now, but at some point it will be important to you...

</details>



**Function expression (fat arrow syntax with implicit return)**

Because programmers are frequently lazy typists and our little anonymous function expressions frequently don't have any functionality beyond returning a value, we have a version with an _implicit return_. 

If we leave off the curly braces, this tells JavaScript that we just have a return value and we can also leave of the `return` keyword.

```javascript
const double = (x) => 2 * x;
```

Note that if your function returns an object, the curly braces will make it look like you want the explicit return and you will get a syntax error. To return an object from this version, surround it in parentheses. 

### Higher-order functions


Anonymous functions are a common concept in JavaScript. JavaScript borrows from the functional programming paradigm, and the use of _higher-order functions_ (functions that take functions as arguments) is common.

Consider this simple `for` loop

```javascript
const m = [4, 6, 2, 7];
for (let i = 0; i < m.length; i++) {
  console.log(m[i]);
}
```

We might rewrite this loop using the built in `forEach` loop on Arrays as:

```javascript
m.forEach(function (i) {
  console.log(i);
});
```

or using fat arrow syntax:

```javascript
m.forEach((i) => console.log(i));
```

In general arrow functions are preferred for their conciseness. For example, instead of

```javascript
const f = function moreDescriptiveNameForF() {};
```

we could write

```javascript
const f = () => {};
```




Some common methods (operations) that use this pattern are `map`, `filter`,
`reduce`, and `sort`. In each of these examples we are using higher-order
functions to abstract over actions (e.g. filtering an array to keep just
those elements that satisfy a predicate) not just values. What do we mean by
abstracting over actions? Instead of a writing a function that filters data
with specific (and fixed) predicate and applying that function to arbitrary
data, we are writing a generic filter function that can be applied to arbitrary
data _and_ implement arbitrary predicates (by supplying a different predicate
function value). For example:

```javascript
const filterPos = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 0) {
      result.push(array[i]);
    }
  }
  return result;
};

const filterNeg = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 0) {
      result.push(array[i]);
    }
  }
  return result;
};

filterPos([0,1,2,3,4]);
filterNeg([0,1,2,3,4]);
```

Can be written as:

```javascript
[0,1,2,3,4].filter((item) => item >= 0);
[0,1,2,3,4].filter((item) => item < 0);
```

What is the difference between `forEach` and `map`? The latter returns a new
array of the same length with the values produced by invoking the function
argument on the input array. Knowing that, how could we implement `map` with
`forEach`, i.e. how would you implement `function map(a, f)` such that

```javascript
const a = [4, 6, 7, 9];
map(a, (item) => item + 1); // Equivalent to map(m, (item) => { return item + 1; });
```

produces `[5, 7, 8, 10]`. As a hint, check out the [Array
methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
and note that an empty array can be created with `[]`.

<details>
<summary>Click for solution</summary>



```javascript
const map = (a, f) => {
  let result = [];
  a.forEach((item) => {
    result.push(f(item));
  });
  return result;
};
```

</details>



### Objects

Like Java and Python, JavaScript is object oriented. Everything is an object.

Objects have properties and methods, which we can access with dot notation or
via the indexing operation, i.e. `obj.name` and `obj['name']` are equivalent.

We can create object literals just like they were Python dictionaries, and work
with them in similar ways:

```javascript
let rectangle = {
  x: 20,
  y: 20,
  width: 10,
  height: 25,
  aspectRatio: () => {
    this.width / this.height;
  },
};
```

```javascript
> rectangle.x
20
> rectangle['y']
20
> rectangle.color = 'red';
'red'
> rectangle
{ x: 20,
  y: 20,
  width: 10,
  height: 25,
  aspectRatio: [Function: aspectRatio],
  color: 'red' }
```

In our above example, `aspectRatio` is a method (a property that is a
function), but it is only available on the `rectangle` object. To share properties
between objects that are instances of a class we can use prototypes.

JavaScript is a "prototype-based language", that is each object has a
prototype. You can think of the prototype as a "fallback". From [Eloquent
Javascript](http://eloquentjavascript.net/3rd_edition/06_object.html), a
helpful introduction to this topic and the source for the following quote and
description:

> When an object gets a request for a property that it does not have, its
> prototype will be searched for the property, then the prototype’s prototype,
> and so on.

These prototypes (accessible via `Object.getPrototypeOf(obj)`) forms a tree with
`Object.prototype` at the root.

To create a new instance of a class we need to create an object with the
appropriate prototype _and_ all the properties that instance must have. Doing
so is the constructor's job. An example JavaScript constructor:

```javascript
function Hello(name) {
  this.name = name;
}
```

If you invoke the `new` operator on a function, that function is treated as a
constructor. When you invoke `new Hello`, an object with the correct prototype
is created (the `Hello.prototype` property), that object is bound to `this` in
the constructor function, and ultimately returned by `new`.

All constructors (all functions) have a `prototype` property. There is an
important distinction between the constructor's prototype and its `prototype`
property. The former is `Function.prototype`, since the constructor is a
function, and the latter holds the prototype for objects created via that
constructor. Properties that should be shared by all instances of a class are
added to the constructor's prototype property, e.g. `Hello.prototype`.

This may seem foreign to you. ES6 introduced class declarations (using the `class` keyword)
implemented on top of JavaScript's much more flexible prototypal inheritance
features. These classes will likely seem more familiar to you and we will use
them this semester.

Consider the following
example ([source](https://github.com/addyosmani/es6-equivalents-in-es5#classes)):

```javascript
class Hello {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return 'Hello ' + this.name + '!';
  }

  static sayHelloAll() {
    return 'Hello everyone!';
  }
}

class HelloWorld extends Hello {
  constructor() {
    super('World');
  }

  echo() {
    console.log(super.hello());
  }
}

const hw = new HelloWorld();
hw.echo();
hw.hello();

console.log(Hello.sayHelloAll());
```

The equivalent ES5 code would approximately be (alternatively a more faithful
[translation](https://goo.gl/ZvEQDq) generated by the Babel transpiler):

```javascript
function Hello(name) {
  this.name = name;
}

Hello.prototype.hello = function hello() {
  return 'Hello ' + this.name + '!';
};

Hello.sayHelloAll = function () {
  return 'Hello everyone!';
};

function HelloWorld() {
  Hello.call(this, 'World');
}

HelloWorld.prototype = Object.create(Hello.prototype);
HelloWorld.prototype.constructor = HelloWorld;
HelloWorld.sayHelloAll = Hello.sayHelloAll;

HelloWorld.prototype.echo = function echo() {
  console.log(Hello.prototype.hello.call(this));
};

var hw = new HelloWorld();
hw.echo();
hw.hello();

console.log(Hello.sayHelloAll());
```

I don't want to downplay the flexibility and power of JavaScript's prototypal
model. For example, it enables "concatenative inheritance" (often termed
mixins). See this
[post](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
for more examples. And I do want to note that many people are not a fan of the
`class` keyword. If you are interested I encourage you to learn more. But I
also don't want us to get hung up on the way to our higher-level goals in the
course. Thus the extensive use of the `class` keyword and its more familiar
structure.


### Spreading

JavaScript has some syntax for working with objects and arrays that will seem very strange at first, and then (if you are like me) you will start trying (unsuccessfully) to use in other languages... Both of these are about rapid access to the elements of the underlying data structure.

For arrays, we have the [**spread** operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), which is `...`. This treats all of the elements of the array as individuals. We use this when we have a list of values stored in an array, and we want to apply it to something that expects a comma separated list of values, not a single array.

For example, calling functions:

```javascript
const sum = (x, y) => x + y;

let args = [4, 5];

console.log(sum(4, 5)); // entered manually
console.log(sum(args[0], args[1])); // reading values from the array
console.log(sum(...args)); // using spreading
```

We also use it to add all of the elements of one array to another array:

```javascript
const list1 = [1, 2, 3];
const list2 = [list1, 4]; // [[1,2,3],4]
const list3 = [...list1, 4]; // [1,2,3,4]
```

This also works for objects, and can be used to clone objects or create new objects with additions fields.

```javascript
const obj1 = {
  a: 1,
  b: 2,
};

const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}
```

With objects, latter property definitions override earlier ones, which also be useful.

```javascript
const obj1 = {
  a: 1,
  b: 2
};

const obj2 = {...obj1, , b:4, c:3}; // {a:1, b:4, c:3}
```

If we use `...` in the function definition, it reverses the process, condensing a collection of disparate arguments into an array. These are called [**rest parameters**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

### Destructuring

[**Desctructuring**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is a related concept that allows us to extract portions of arrays and objects out during assignment statements.

With arrays, the destructuring happens based on position.

```javascript
const l = [1, 2, 3];
const [a, b, c] = l; // a = 1, b= 2, c = 3
```

We can combine it with spreading:

```javascript
const l = [1, 2, 3, 4, 5, 6];
const [a, b, ...rest] = l; // a=1, b=2, rest=[4,5,6]
```

With objects, we can name the new variables with the names of properties in the object:

```javascript
const obj = {
  name: 'James Robert McCrimmon',
  age: 20,
  nickname: 'Jamie',
};

const { name } = obj; // name = "James Robert McCrimmon"

// can do multiples as well
const { age, nickname } = obj; // age=20, nickname="Jamie"
```

This can also be used in function arguments, which we will see a great deal. On the face of it, this seems strange, if we know we only want two fields, why write the function to accept an object that we have to take apart? This only makes sense in the context of other expectations for the functions. For example, it may be that we did not write the code that will call the function. Or we want it to work with a variety of different objects that have some fields in common.

```javascript
const printName = ({ name }) => console.log(name);

// assuming our earlier object,
// but this would work on any object that has a name field
printName(obj);
```
