---
title: "CS 467 - Tutorial Seven"
date: "2023-04-04"
due: "2023-04-11T14:15"
name: "Tutorial 07"
published: false
---




#### Goals

- Learn about reaction diffusion simulations
- Get more practice implementing a scientific process
- Learn a little bit about direct pixel manipulation




## Prerequisites


1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/ipdqXDxy). 
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Assignment

In this tutorial you are going to write an implementation of the reaction diffusion process. 

![Practical 7 Goal](./tutorial07/tutorial07.png)

*Links to the references for the included functions can be found at the bottom.*

### Part 0: Learn about the reaction-diffusion effect

The reaction-diffusion model of morphogensis was introduced by Alan Turing (yes _that_ Turing) to describe how some patterns in nature arise. It is, in essence, a model of how two chemicals can interact to reach stable states. Our interest, as ever, is in the aesthetic properties of these patterns (and since we just spent a bunch of time talking about physics, it seemed a good moment to get chemistry and biology involved).

The basic idea is that we have two chemicals that are mixing together. The _reaction_ is from one chemical "eating" the other to grow. The _diffusion_ comes from the quantities spreading out across the surface. As they mix, they create interesting pockets of stability, giving us patterns. 

For more of an explanation, read through the [Reaction-diffusion Tutorial](https://www.karlsims.com/rd.html) from Karl Sims. Conceptually there is enough there for you to write an implementation, but I'll give you a little more guidance (but really -- go read it first). 


### Part 1: Make a grid

As you hopefully figured out reading the tutorial, we are not modeling individual particles of the substances, we are keeping track of the concentration at each "site". 

In our case, each "site" will be a single pixel on the canvas. So we need a data structure that will keep track of two values for each pixel: the concentration of substance A and the concentration of substance B. Our solution will be to use a two-dimensional array of simple object literals that can hold a value for A and a value for B. 

In JavaScript, 2D arrays are really just arrays of arrays. So we are going to need to make the internal arrays ourselves. 

At the top level, declare a new variable called `cells`. We will initialize this in `setup()`.

In `setup`, initialize `cells` to an empty array. 

Create a nested `for` loop. For the outer loop, iterate from 0 to `height`. In other words, we are creating an array of rows. 

Inside of the `for` loop, create a new empty array and call it `row`. Add this to `cells`. 

The inner loop should iterate from 0 to `width`. For each iteration, add the object literal `{a:random(), b:random()}` to `row`. This is initializing each site with a random concentrations of A and B. 

### Part 2: Draw the grid

Write a new function called `drawCells`. 

Rather than drawing shapes, we are going to directly set the pixels of the canvas. We have two functions we will use to do this:

- `set(x, y, c)` - this function sets the color of the pixel at `(x,y)` to the color `c`.
- `updatePixels()` - updates the display with the colors we set. This must be called after we use set for anything to appear. 

Draw a nested `for` loop and iterate over `cells`. If the concentration of A is higher than B, then set the pixel to black, otherwise set it to white. 

After the `for` loops, call `updatePixels` to load your changes to the canvas.


Call your new function from within the `draw()` function. 

If you run your code, you should get something that looks like our field of random numbers. 

### Updating the simulation

Now comes the ~~tricky~~ fiddly part -- implementing those equations in the middle of the tutorial. 

As you learned from the tutorial, there are four constants that control the look of the pattern(`Da`, `Db`, `F`, and `K`): the diffusion rate for A, the diffusion rate for B, the feeding rate (the rate with which A is introduced), and the kill rate (the rate with which B is removed). Create these at the top of the file and initialize them with the values from the tutorial: `Da` = 1.0, `Db` = 0.5, `F` = 0.055, and `K` = 0.062.

Now create a function called `updateSimulation()`. We need to visit each cell and update its value, so again put in a nested `for` loop that iterates over all of the cells. For the most part, we can just copy the functions from the tutorial. 

Note that one of the terms ($AB^2$) is being subtracted from one and added to the other. Make sure you jut calculate it once.

We will also assume that our $\delta t$ is always 1, so you can skip that term.

You will also want to use `constrain` to make sure that the concentrations of `a` and `b` never exceed 1 or go below 0. 

It is the Laplacian operator in there will take a little more work...


#### Implementing the Laplacian

What exactly _is_ the Laplacian? Basically, it is a way to check on the neighbors and adjust our value to be somewhat similar. We will find the average of our neighbors and then check to see how far off we are. We also want to pay more attention to the immediate neighbors to the top, bottom, left, and right, so we are going to use a **weighted average** to give these priority. For a weighted average, rather than summing the values and dividing by the count, we will multiple each neighboring value by a weight and then sum all of the products together (the weights should all sum to 1). 

We then will subtract out the value of the current cell, to get the difference from the average. 

It is helpful to think of the cell you are updating as being in the middle of a 3x3 grid. 

We then have a collection of weights that we apply to these nine values (these weights are given in the tutorial). We want to multiple these weights to the values in the grid. Then we sum all of the products together to get our diffusion factor.  


![Laplacian kernel](./tutorial07/Laplacian-kernel.png)

_If you have done any image processing, this is just a convolution process. If you haven't... well it is still a convolution process, but you can safely forget that I said that._

If you look at those equations, we need to run this process for both the A and the B values, so we will implement a general purpose Laplacian function.

We are going to take advantage of the fact that JavaScript objects can be accessed with dot notation OR square bracket notation. So `obj.a` is equivalent to `obj["a"]`. The ability to use string names in the square bracket notation means that we can pass in a variable

```javascript

const obj = {a:5, b: 7};
const type = "a";
console.log(obj.a); // prints 5
console.log(obj.type); // prints undefined, obj doesn't have a type property
console.log(obj[type]); // prints 5
```

- Make a new function called `laplacian`
- Give the function three arguments `i`, `j`, and `type` (the type will be "a" or "b")
- We can access a cell with `cell[i][j][type]`
- For each of the nine cells (`(i,j)` and its neighbors), multiply the value by the appropriate weight and then sum them all together (you could use a loop, but I just wrote out the nine products)
- Return the sum

A valid question to ask at this point is "what if `(i, j)` is on an edge?". If we are on the edge, we are going to have errors when we try to access invalid cells. _However_, speed is very much a concern and all of the extra checks that we would need to do are surprisingly expensive. So, for now, we will assume that we always are asking for valid values. 

#### Managing details
There are two big consequences of having to do the Laplacian.

The first is the problem of the borders. The solution to that is to change the nested `for` loops in `updateSimulation` so they don't visit cells on the borders. Change the bounds so that you are looping over values that are one pixel in from the edge all of the way around. 

The second issue is a little subtler. Because the Laplacian operator is looking at all of the neighboring values, inevitably some of them will have already been updated. We don't really want to have a mix of old and new values being used to calculate a cell's next state. Our solution will need to be to store all of the new values for the cells somewhere else so we don't lose the old ones. 

There are a number of ways that we could do this. One approach would be to add a second set of fields to our cell objects like we did for the random walking worms earlier. However, with a small change we can eek out a little more speed. Rather than adding our new values into the same object, we will create a duplicate set of the entire 2D array of data.

This may seem like a curious choice, but consider the difference. If we store the next values in the cell objects themselves, then we have to swap every value individually at draw time. If we have a duplicate of the entire data structure, we can make the swap with just three assignment statements and all we actually copy are the references to the two structures. 

To implement this, create a new global variable called `next`. Initialize it alongside `cells` in `setup` (basically copy everything that you do to build `cells`). The only difference is that you should initialize the individual cells to `{a:1, b:0}`. For the most part, this step doesn't matter since you will overwrite the values in `next` almost immediately. However, you _won't_ update the values on the border, and this is a good value to freeze those at. 

At the very end of `updateSimulation`, outside of the nested loops, use a temporary variable to swap `next` and `cells`. 

Add `updateSimulation` to your `draw` function so that it is done on every cycle. 


### Part 3: Play!

Run your simulation, and wait... This will take some patience. Some of our previous pieces have been slow, but this one is _reeeeaaallllyyyy_ slow. This is partly because it is so compute heavy, but also because the reaction-diffusion process itself is leisurely. You can speed it up some by reducing the size of the canvas. If you don't want to see the animation of the flow, you can also run `updateSimulation` multiple times between drawings, which will make it a little quicker to get to stable states, but it won't _feel_ faster since there will periods when nothing happens. 

The random distribution also means that it takes a while for anything interesting to happen (the patterns are interesting, but it takes a while for the distribution to get to a point where it creates something interesting). Change the initialization so that it sets `a` to 1 for all cells. Then, for some small number of cells, set the concentration of `b` to 1 as well. The reaction will start faster this way, and the patterns will be more symmetric. Experiment with square areas, circular areas or multiple sites where you drop `b`. 

You can also experiment with different feeding and kill rates. The tutorial has a couple of suggestions. Surprisingly small changes can have a big impact. It is also easy to create a system where one of our substances just "wins". 

You could also add mouse interaction that allows you to drop in high concentrations of `b` around the canvas. 

Color would be another place for improvement (though any color calculation will slow things down)

## Can we make this any faster?
With what we know at the moment, we are pretty much at the limit. I did a lot of tuning and trimming to get it to this state. 

However, if you want to see what it _could_ look like, check out [this simulation](https://jurasic.dev/emergent_behaviour/reactionDiffusion/), which feels much more real time. 

How is his so much faster than ours? He is using shaders so that he can leverage the graphics card. Each pixel in our image can essentially be processed in parallel -- there are no dependencies except between renders. So on a good graphics card, huge chunks of the image are done simultaneously. 


## Finishing up

Commit your changes to git and push them back up to GitHub. I will find them there.

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/#/p5/background)  
[constrain](https://p5js.org/reference/#/p5/constrain)  
[createCanvas](https://p5js.org/reference/#/p5/createCanvas)   
[random](https://p5js.org/reference/#/p5/random)  
[set](https://p5js.org/reference/#/p5/set)   
[stroke](https://p5js.org/reference/#/p5/stroke)  
[sub](https://p5js.org/reference/#/p5.Vector/sub)  
[updatePixels](https://p5js.org/reference/#/p5/updatePixels)  