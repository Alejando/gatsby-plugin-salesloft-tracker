---
name: "Pumping Those Array Muscles"
date: "2019-11-07"
image: ./pumping-those-array-muscles.jpg
keywords: "Javascript, Array, Methods, ES6, array, methods, functional programming, map, filter"
author: Alfonso Alejandro Espinosa de los Monteros Andrade
social_summary: "Over this series, we are going to explore some of the most common array methods that JavaScript brings to the table, without React, Angular or any other framework on the market. In this episode, we are going to explore map, filter and find."
tags:
  - javascript
  - map
  - filter
  - functional-programming
  - array
description: "Over this series, we are going to explore some of the most common array methods that JavaScript brings to the table, without React, Angular or any other framework on the market. In this episode, we are going to explore map, filter and find."
---

Hi everyone! I’m Alejandro from Density Labs, and I would like to share through this blog series, some of the most popular array methods, I'll also share some pro tips and caveats we could encounter while using them.
​
On a daily basis we use different tools and libraries to help us get the job done, but I would like to say that the array methods are your best friends to make data manipulation immutable and readable, that’s why I'm going to share some uses cases and tips for some of the array methods that JavaScript has.
​
### .map()
The `.map()` method creates a new array with the result of the callback function we provided for every element.
​
Knowing this we can be sure that it is going to return the same length of values from the mapped array.
Let's start with a basic implementation of `.map()`.
​
```javascript
const numArray = [1, 4, 9, 16];
// pass a function to map
const mapExample = numArray.map(number => number * 2);
// output [2, 8, 18, 32]
```
​
After reading this snippet of code we understand that every number from the array is going to be multiplied by 2.
Having said this, let's create an arrays of objects from a simple array:
​
```javascript
const numArray = [1,2,3];
const newNumArray = numArray.map((num, index) => ({
  index,
  value: num
}))
//output newArr = [{ index: 0, value: 1},{ index: 1, value: 2},{ index: 2, value: 3}]
```
Here we are returning an object, the index of the mapped value, and  its value. As we can see in this example we could even add new properties to an existent array of objects.
​
#### 🚨CAVEAT
​
A common mistake while working with .map() is doing some kind of conditional or filtering and not returning anything.
​
```javascript
[1,2,3].map(num => {
  if(num === 1 ) {
   return num
  }
})
//output [1, undefined, undefined]
```
Because as we said in the beginning map runs the callback function within every input from the array, so it will return the same length array from the array that is being mapped. For such use cases, I would recommend using the filter method.
​
### .filter()
Filter method is pretty easy and powerful, it simply creates a new array with all elements that pass criteria we are filtering by, for example
​
```javascript
[20,10,13,18].filter(num => num >= 18)
//output [20,18]
```
In the simple example above, we can tell that everything we need to evaluate is if the conditions pass so it will return that value.
Let's move to a more complex example with an array of objects
​
```javascript
const inventors = [
  { first: 'Albert', last: 'Einstein', country: 'Germany'},
  { first: 'Isaac', last: 'Newton', country: 'Uk'},
  { first: 'Galileo', last: 'Galilei', country: 'Italy'},
  { first: 'Marie', last: 'Curie', country: 'Poland'},
  { first: 'Johannes', last: 'Kepler', country: 'Germany'},
  { first: 'Nicolaus', last: 'Copernicus', country: 'Poland'},
];
```
We would like to filter all the inventors from Germany
```javascript
inventors.filter(inventor => inventor.country === 'Germany')
/*Output
[
    {
        "first": "Albert",
        "last": "Einstein",
        "country": "Germany"
    },
    {
        "first": "Johannes",
        "last": "Kepler",
        "country": "Germany"
    }
]*/
```
In this example, we are using a simple comparison in every object of the array to know if the country they belong to is Germany.
​
#### 🚨PRO TIP
​
While working with filter sometimes we want more than one value to check for, maybe we want inventors from Germany and Poland, in this case, we could create a constant and make use of `.includes()`
​
```javascript
const INVENTORS_FROM_GERMANY_AND_POLAND = ['Germany', 'Poland']
inventors.filter(inventor =>   INVENTORS_FROM_GERMANY_AND_POLAND.includes(inventor.country))
/* output
[
    {
        "first": "Albert",
        "last": "Einstein",
        "country": "Germany"
    },
    {
        "first": "Marie",
        "last": "Curie",
        "country": "Poland"
    },
    {
        "first": "Johannes",
        "last": "Kepler",
        "country": "Germany"
    },
    {
        "first": "Nicolaus",
        "last": "Copernicus",
        "country": "Poland"
    }
]
*/
```
Using `.includes()` with `.filter()`, gives us a better visual experience to remember which are all the values that we are filtering by, instead of adding many or statements, if you want to try a different approach you could use a hash or a dictionary.
​
### .find()
Find is similar to filter, but instead of returning an array, returns the FIRST match of the value we are looking for
```javascript
// we are using the data from the example above
inventors.find(inventor => inventor.country === 'Italy')
//output {first: "Galileo", last: "Galilei", country: “Italy"}
```
#### 🚨CAVEAT
​
A common mistake here is that .find() does not return an array, it will return the first available match with the criteria we are looking for.
​
We will continue with more methods and pro tips in part two, so stay tuned and thanks for reading this. 