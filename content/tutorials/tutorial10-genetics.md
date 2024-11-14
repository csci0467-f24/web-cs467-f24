---
title: "CS 467 - Tutorial 10"
date: "2024-11-18"
due: "2024-11-22T23:59"
name: "Tutorial 10"
published: true
---

#### Goals

- Implement a genetic algorithm

## Prerequisites

1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/xlrS0pE1).
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Objective

We have built up a parametric flower generator in class. It is capable of generating a very large variety of flower-like shapes. To see some of the possible combinations, we have looked at the bank of sliders approach as well as animation. Now we are going to try using a genetic algorithm to explore the space.

We will use a _human-in-the-loop_ approach where the viewer will guide the exploration instead of trying to come up with a fitness function. The user will be presented with a collection of flowers. The most interesting flowers are selected, and then the picks are tossed to the genetic algorithm to create the next pool of flowers.

![flower selection interface](./tutorial10/flowers.png)

As a reminder of the process, we will:

- start by generating a population of random candidates
- display the pool of flowers
- let the user make picks
- randomly select a air of parents from the selection
- mutate the children based on some mutation rate
- form a new population of the mutated children
- go back to step 2 and repeat

#### Starter code

I've provided you with some starter code to save us some time. You should go take a look at it. There is a fair amount of code, but it doesn't really do very much at the moment.

To make things easier to read, I've split this into two files. In `flowers.js` you will find the code we developed for drawing the flowers. This is pretty much exactly what we developed in class. The only new piece is that I added `generateRandomFlower()`, which does exactly what it says -- it makes an array of random values between 0-1 of the appropriate length (another reason to favor our float array representation).

In `sketch.js` you can see that you have constants defining a basic grid over the canvas and a UI with a couple of buttons and sliders.

There are two variables and a constant that you will need to pay attention to:

- `pool` - this is an array of flower genomes (parameter arrays)
- `picks` - this is a list of numbers corresponding to the selections made by the user
- `POOL_SIZE` - this is the number of flower genomes we should have in the gene pool (this is determined by the grid)

Take a look at the `draw()` function. You will see that this iterates over the `picks` and draws rectangles at appropriate locations, and it iterates over the pool and draws the flowers.

There is also a `mouseClicked()` function that handles the picks. This is the only part that actually works, if you click around the canvas yuo will see that you can toggle the highlights on the cells.

## Part 1: Initialize the pool

Before we can do anything, we need some flowers in the gene pool. Find the `initializePool()` function. You will see that it already clears both the `pool` and the `picks`, and redraws at the end. Load the `pool` with a collection of randomly generated flowers.

You should now have a grid of flowers. If you click the "New Pool" button you should get an entirely new batch.

## Part 2: `nextGeneration` -- handling picks

The next step is to handle the user's selections and use them to form the next generation of flowers.

Start by making a candidate pool from `picks`. The easiest way to do this is to use the `map` function (the [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function, not the one from p5.js).

Iterate over the pool and replace each entry with a random selection from the candidate pool you created. Recall that p5.js's `random` function can return random elements from an array.

Make sure to zero out the length of the `picks` to reset it for the next generation.

Try it out. You should be able to make some picks, click the "Next generation" button and see a pool made up only of your picks.

## Part 3: `nextGeneration` -- breeding

This isn't much of an exploration yet because we aren't vising any new points in the design space. To address this we are going to introduce _breeding_.

Create a new function called `crossover(parent1, parent2)`. This will take in two genomes and return a child that represents a mix of the two.

Start by creating a new array to hold the child's parameters.

Iterate over the length of one of the parents. For each index, randomly chose the value at that position from either `parent` or `parent2`.

Back in `nextGeneration()`, replace the selection of a single random candidate with the selection of _two_ random candidates. Breed these together and add the child to the pool.

_What if both parents are the same? This isn't a problem -- it just means that the flower's full genome will advance to the next round._

Now when you run the code, provided you have made more two or more picks, you should see some exploration and new flowers you haven't seen before.

## Part 4: `nextGeneration` -- mutating

This is enough for us to do some exploring, but some areas of our design space will be permanently locked off from the user based on the picks that are made. If the user only makes two picks in the first round, for all future generations, each parameter can only be one of two values. $2^11$ is still a good number of different flowers (2048 of them to be precise), but considerably fewer than we had at the beginning. Each future generation has the potential of closing this space down even further if all of the picks in a round have the same value for one of the parameters.

To keep us from being locked into a shrinking design space, we will introduce mutation, which can create new values for the parameters.

We will have two values (controlled by the two sliders) that will determine how mutation works. The _mutation rate_, is the probability that a particular gene in the genome will mutate. The _mutation amount_ will determine how large a change we will tolerate.

Write a new function called `mutate(genome)`. This should take in a flower's genome and return a mutated version of it.

Iterate over the genome. For each parameter, call `random()`. If the value is greater than or equal to the mutation rate, carry over the parameter unchanged. If the value is less than the mutation rate, you will use a mutated version of the parameter. We could just replace the parameter with a whole new random value, but we will make the change more gradual and centered on the current value. Generate a random number and subtract 0.5 from it. This gives us a shift in either the positive or the negative direction. Multiply this value by the mutation amount. This will allow us to scale the amount of shift we will tolerate. Add this to the current value of the parameter, and then use `constrain` to make sure it remains in the 0-1 range.

Return to `nextGeneration`. Instead of adding the child to the pool, send the child to `mutate` and use the mutated child instead.

Now future generations should strongly take after the picks, but will have some differences that pop up.

## Part 5: Play

Run this through a couple of generations and see how you can narrow in on different regions of the design space. Try playing around with the mutation rate and the mutation amount. What would be a good strategy for using those values if you wanted to find a really good flower?

## Thoughts

It is important to realize that this is a specialized form of genetic algorithms called _interactive evolutionary computation_. In this, the human is stepping in to provide the selection criteria. If we had a way to algorithmically specify what we were looking for, we could write an actual fitness function that could score the flowers by their "closeness" to the point we were looking for in the design space. With a computational fitness function, we could make use of a much larger pool, and be able to race through many generations very quickly, making a much more thorough exploration of the space. The catch, of course, is figuring out just what makes one flower more "fit" than another...

## Finishing up

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5325075) ([submission directions](../resources/gradescope))
